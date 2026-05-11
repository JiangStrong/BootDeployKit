import type { GenerateRequest, GeneratedFile, PreviewResponse, TemplateType } from "@/types/generator";

type TemplateFile = {
  path: string;
  language: string;
  render: (request: GenerateRequest) => string;
};

const baseFiles: TemplateFile[] = [
  { path: "Dockerfile", language: "dockerfile", render: dockerfile },
  { path: "docker-compose.yml", language: "yaml", render: dockerCompose },
  { path: ".env.example", language: "bash", render: envExample },
  { path: "config/application-prod.yml", language: "yaml", render: applicationProd },
  { path: "scripts/deploy.sh", language: "bash", render: deployScript },
  { path: "scripts/restart.sh", language: "bash", render: restartScript },
  { path: "scripts/logs.sh", language: "bash", render: logsScript }
];

export function previewDeployment(request: GenerateRequest): Promise<PreviewResponse> {
  return Promise.resolve({ files: generateDeploymentFiles(request) });
}

export async function downloadDeployment(request: GenerateRequest): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  for (const file of generateDeploymentFiles(request)) {
    zip.file(file.path, file.content);
  }

  return zip.generateAsync({ type: "blob" });
}

export function generateDeploymentFiles(input: GenerateRequest): GeneratedFile[] {
  const request = normalizeRequest(input);
  validateRequest(request);

  const files = [...baseFiles];

  if (request.templateType === "SPRING_BOOT_NGINX") {
    files.push({ path: "nginx/default.conf", language: "nginx", render: nginxDefaultConf });
  }

  if (request.templateType === "SPRING_CLOUD_NACOS") {
    files.push({ path: "config/gateway-application.yml", language: "yaml", render: gatewayApplication });
    files.push({ path: "nacos-docker-compose.yml", language: "yaml", render: nacosDockerCompose });
  }

  files.push({ path: "README.md", language: "markdown", render: readme });

  return files.map((file) => ({
    path: file.path,
    language: file.language,
    content: format(file.render(request))
  }));
}

function normalizeRequest(request: GenerateRequest): GenerateRequest {
  return {
    ...request,
    database: { ...request.database, enabled: request.templateType === "SPRING_BOOT_MYSQL_REDIS" || request.database.enabled },
    redis: { ...request.redis, enabled: request.templateType === "SPRING_BOOT_MYSQL_REDIS" || request.redis.enabled },
    nginx: { ...request.nginx, enabled: request.templateType === "SPRING_BOOT_NGINX" || request.nginx.enabled },
    nacos: { ...request.nacos, enabled: request.templateType === "SPRING_CLOUD_NACOS" || request.nacos.enabled }
  };
}

function validateRequest(request: GenerateRequest) {
  const project = request.project;
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(project.projectName) || project.projectName.length < 2 || project.projectName.length > 50) {
    throw new Error("projectName must use 2-50 lowercase letters, numbers and hyphens");
  }
  if (!/^[A-Za-z0-9._-]+\.jar$/.test(project.jarFileName) || project.jarFileName.includes("/") || project.jarFileName.includes("\\")) {
    throw new Error("jarFileName must be a .jar file name, not a path");
  }
  if (!["8", "11", "17", "21", "25"].includes(project.javaVersion)) {
    throw new Error("javaVersion must be 8, 11, 17, 21 or 25");
  }
  if (!isPort(project.serverPort)) {
    throw new Error("serverPort must be between 1 and 65535");
  }
  if (!/^[A-Za-z0-9._-]+$/.test(project.springProfile)) {
    throw new Error("springProfile may only contain letters, numbers, dots, underscores and hyphens");
  }
  if (!project.logPath || project.logPath.includes("..")) {
    throw new Error("logPath must not contain path traversal segments");
  }
  if (!/^[A-Za-z0-9_-]+$/.test(project.dockerNetwork)) {
    throw new Error("dockerNetwork may only contain letters, numbers, underscores and hyphens");
  }
  if (request.database.enabled && !isPort(request.database.port)) {
    throw new Error("MySQL port must be between 1 and 65535");
  }
  if (request.redis.enabled && !isPort(request.redis.port)) {
    throw new Error("Redis port must be between 1 and 65535");
  }
  if (request.nacos.enabled && !isPort(request.nacos.port)) {
    throw new Error("Nacos port must be between 1 and 65535");
  }
}

function isPort(value: number) {
  return Number.isInteger(value) && value >= 1 && value <= 65535;
}

function format(value: string) {
  return `${value.trim()}\n`;
}

function dockerfile({ project }: GenerateRequest) {
  return `
FROM eclipse-temurin:${project.javaVersion}-jre

WORKDIR /app
COPY ${project.jarFileName} app.jar
ENV SPRING_PROFILES_ACTIVE=${project.springProfile}
EXPOSE ${project.serverPort}
ENTRYPOINT ["java", "-jar", "app.jar"]
`;
}

function dockerCompose(request: GenerateRequest) {
  switch (request.templateType) {
    case "SPRING_BOOT_MYSQL_REDIS":
      return mysqlRedisCompose(request);
    case "SPRING_BOOT_NGINX":
      return nginxCompose(request);
    case "SPRING_CLOUD_NACOS":
      return nacosCompose(request);
    default:
      return basicCompose(request);
  }
}

function basicCompose({ project }: GenerateRequest) {
  return `
services:
  ${project.projectName}:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ${project.projectName}
    restart: always
    env_file:
      - .env
    ports:
      - "${project.serverPort}:${project.serverPort}"
    volumes:
      - ${project.logPath}:/app/logs
    networks:
      - ${project.dockerNetwork}

networks:
  ${project.dockerNetwork}:
    driver: bridge
`;
}

function mysqlRedisCompose({ project, database, redis }: GenerateRequest) {
  const redisCommand = redis.password ? `    command: ["redis-server", "--requirepass", "${redis.password}"]\n` : "";

  return `
services:
  ${project.projectName}:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ${project.projectName}
    restart: always
    env_file:
      - .env
    ports:
      - "${project.serverPort}:${project.serverPort}"
    volumes:
      - ${project.logPath}:/app/logs
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - ${project.dockerNetwork}

  mysql:
    image: mysql:8.4
    container_name: ${project.projectName}-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${database.rootPassword}
      MYSQL_DATABASE: ${database.databaseName}
      MYSQL_USER: ${database.username}
      MYSQL_PASSWORD: ${database.password}
    ports:
      - "${database.port}:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 10
    networks:
      - ${project.dockerNetwork}

  redis:
    image: redis:7.4-alpine
    container_name: ${project.projectName}-redis
    restart: always
${redisCommand}    ports:
      - "${redis.port}:6379"
    volumes:
      - redis-data:/data
    networks:
      - ${project.dockerNetwork}

networks:
  ${project.dockerNetwork}:
    driver: bridge

volumes:
  mysql-data:
  redis-data:
`;
}

function nginxCompose({ project }: GenerateRequest) {
  return `
services:
  ${project.projectName}:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ${project.projectName}
    restart: always
    env_file:
      - .env
    expose:
      - "${project.serverPort}"
    volumes:
      - ${project.logPath}:/app/logs
    networks:
      - ${project.dockerNetwork}

  nginx:
    image: nginx:1.27-alpine
    container_name: ${project.projectName}-nginx
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - ${project.projectName}
    networks:
      - ${project.dockerNetwork}

networks:
  ${project.dockerNetwork}:
    driver: bridge
`;
}

function nacosCompose({ project, nacos }: GenerateRequest) {
  return `
services:
  ${project.projectName}:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ${project.projectName}
    restart: always
    env_file:
      - .env
    ports:
      - "${project.serverPort}:${project.serverPort}"
    volumes:
      - ${project.logPath}:/app/logs
    depends_on:
      - nacos
    networks:
      - ${project.dockerNetwork}

  nacos:
    image: nacos/nacos-server:v2.4.3
    container_name: ${project.projectName}-nacos
    restart: always
    environment:
      MODE: ${nacos.mode}
      NACOS_AUTH_ENABLE: "true"
      NACOS_AUTH_IDENTITY_KEY: bootdeploykit
      NACOS_AUTH_IDENTITY_VALUE: bootdeploykit
      NACOS_AUTH_TOKEN: bootdeploykit-please-change-this-token-before-production-use
    ports:
      - "${nacos.port}:8848"
    volumes:
      - nacos-data:/home/nacos/data
      - nacos-logs:/home/nacos/logs
    networks:
      - ${project.dockerNetwork}

networks:
  ${project.dockerNetwork}:
    driver: bridge

volumes:
  nacos-data:
  nacos-logs:
`;
}

function envExample(request: GenerateRequest) {
  const { project, database, redis, nacos } = request;

  if (request.templateType === "SPRING_BOOT_MYSQL_REDIS") {
    return `
SPRING_PROFILES_ACTIVE=${project.springProfile}
SERVER_PORT=${project.serverPort}
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/${database.databaseName}?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false
SPRING_DATASOURCE_USERNAME=${database.username}
SPRING_DATASOURCE_PASSWORD=${database.password}
SPRING_DATA_REDIS_HOST=redis
SPRING_DATA_REDIS_PORT=6379
${redis.password ? `SPRING_DATA_REDIS_PASSWORD=${redis.password}\n` : ""}`;
  }

  if (request.templateType === "SPRING_CLOUD_NACOS") {
    return `
SPRING_PROFILES_ACTIVE=${project.springProfile}
SERVER_PORT=${project.serverPort}
SPRING_CLOUD_NACOS_DISCOVERY_SERVER_ADDR=nacos:8848
SPRING_CLOUD_NACOS_CONFIG_SERVER_ADDR=nacos:8848
SPRING_CLOUD_NACOS_USERNAME=${nacos.username}
SPRING_CLOUD_NACOS_PASSWORD=${nacos.password}
`;
  }

  return `
SPRING_PROFILES_ACTIVE=${project.springProfile}
SERVER_PORT=${project.serverPort}
`;
}

function applicationProd(request: GenerateRequest) {
  const { project, redis } = request;

  if (request.templateType === "SPRING_BOOT_MYSQL_REDIS") {
    return `
server:
  port: ${project.serverPort}

spring:
  application:
    name: ${project.projectName}
  datasource:
    url: \${SPRING_DATASOURCE_URL}
    username: \${SPRING_DATASOURCE_USERNAME}
    password: \${SPRING_DATASOURCE_PASSWORD}
    driver-class-name: com.mysql.cj.jdbc.Driver
  data:
    redis:
      host: \${SPRING_DATA_REDIS_HOST:redis}
      port: \${SPRING_DATA_REDIS_PORT:6379}
${redis.password ? "      password: ${SPRING_DATA_REDIS_PASSWORD}\n" : ""}
logging:
  file:
    path: /app/logs
  level:
    root: INFO
`;
  }

  if (request.templateType === "SPRING_BOOT_NGINX") {
    return `
server:
  port: ${project.serverPort}
  forward-headers-strategy: framework

spring:
  application:
    name: ${project.projectName}

logging:
  file:
    path: /app/logs
  level:
    root: INFO
`;
  }

  if (request.templateType === "SPRING_CLOUD_NACOS") {
    return `
server:
  port: ${project.serverPort}

spring:
  application:
    name: ${project.projectName}
  cloud:
    nacos:
      discovery:
        server-addr: \${SPRING_CLOUD_NACOS_DISCOVERY_SERVER_ADDR:nacos:8848}
        username: \${SPRING_CLOUD_NACOS_USERNAME:nacos}
        password: \${SPRING_CLOUD_NACOS_PASSWORD:nacos}
      config:
        server-addr: \${SPRING_CLOUD_NACOS_CONFIG_SERVER_ADDR:nacos:8848}
        username: \${SPRING_CLOUD_NACOS_USERNAME:nacos}
        password: \${SPRING_CLOUD_NACOS_PASSWORD:nacos}

logging:
  file:
    path: /app/logs
`;
  }

  return `
server:
  port: ${project.serverPort}

spring:
  application:
    name: ${project.projectName}

logging:
  file:
    path: /app/logs
  level:
    root: INFO
`;
}

function nginxDefaultConf({ project, nginx }: GenerateRequest) {
  return `
server {
    listen 80;
    server_name ${nginx.domain};

    client_max_body_size 20m;

    location / {
        proxy_pass http://${project.projectName}:${project.serverPort};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
`;
}

function gatewayApplication({ project, nacos }: GenerateRequest) {
  return `
server:
  port: ${project.serverPort}

spring:
  application:
    name: ${project.projectName}
  cloud:
    gateway:
      routes:
        - id: example-service
          uri: lb://example-service
          predicates:
            - Path=/api/example/**
          filters:
            - StripPrefix=2
    nacos:
      discovery:
        server-addr: nacos:8848
        username: ${nacos.username}
        password: ${nacos.password}
`;
}

function nacosDockerCompose({ project, nacos }: GenerateRequest) {
  return `
services:
  nacos:
    image: nacos/nacos-server:v2.4.3
    container_name: ${project.projectName}-nacos
    restart: always
    environment:
      MODE: ${nacos.mode}
      NACOS_AUTH_ENABLE: "true"
      NACOS_AUTH_IDENTITY_KEY: bootdeploykit
      NACOS_AUTH_IDENTITY_VALUE: bootdeploykit
      NACOS_AUTH_TOKEN: bootdeploykit-please-change-this-token-before-production-use
    ports:
      - "${nacos.port}:8848"
    volumes:
      - nacos-data:/home/nacos/data
      - nacos-logs:/home/nacos/logs
    networks:
      - ${project.dockerNetwork}

networks:
  ${project.dockerNetwork}:
    driver: bridge

volumes:
  nacos-data:
  nacos-logs:
`;
}

function deployScript({ project, templateType, nacos }: GenerateRequest) {
  const label: Record<TemplateType, string> = {
    SPRING_BOOT_BASIC: project.projectName,
    SPRING_BOOT_MYSQL_REDIS: `${project.projectName} with MySQL and Redis`,
    SPRING_BOOT_NGINX: `${project.projectName} behind Nginx`,
    SPRING_CLOUD_NACOS: `${project.projectName} with Nacos`
  };

  return `
#!/usr/bin/env bash
set -euo pipefail

echo "Building and starting ${label[templateType]}..."
cp -n .env.example .env || true
docker compose down
docker compose up -d --build
docker compose ps
${templateType === "SPRING_CLOUD_NACOS" ? `echo "Nacos console: http://localhost:${nacos.port}/nacos"` : 'echo "Deployment completed."'}
`;
}

function restartScript({ project, templateType }: GenerateRequest) {
  const services = templateType === "SPRING_BOOT_NGINX"
    ? `${project.projectName} nginx`
    : templateType === "SPRING_CLOUD_NACOS"
      ? `${project.projectName} nacos`
      : project.projectName;

  return `
#!/usr/bin/env bash
set -euo pipefail

docker compose restart ${services}
docker compose ps
`;
}

function logsScript({ project, templateType }: GenerateRequest) {
  const services = templateType === "SPRING_BOOT_NGINX"
    ? `${project.projectName} nginx`
    : templateType === "SPRING_CLOUD_NACOS"
      ? `${project.projectName} nacos`
      : project.projectName;

  return `
#!/usr/bin/env bash
set -euo pipefail

docker compose logs -f --tail=200 ${services}
`;
}

function readme(request: GenerateRequest) {
  switch (request.templateType) {
    case "SPRING_BOOT_MYSQL_REDIS":
      return mysqlRedisReadme(request);
    case "SPRING_BOOT_NGINX":
      return nginxReadme(request);
    case "SPRING_CLOUD_NACOS":
      return nacosReadme(request);
    default:
      return basicReadme(request);
  }
}

function basicReadme({ project }: GenerateRequest) {
  return `
# ${project.projectName} Deployment Package

This package was generated by BootDeployKit for a Spring Boot Docker deployment.

## Files

- \`Dockerfile\`: container image definition
- \`docker-compose.yml\`: runtime stack
- \`.env.example\`: environment variable example
- \`config/application-prod.yml\`: Spring Boot production configuration
- \`scripts/deploy.sh\`: build and start the stack
- \`scripts/restart.sh\`: restart the application
- \`scripts/logs.sh\`: follow application logs

## Requirements

- Docker
- Docker Compose v2

## Usage

1. Copy your Spring Boot JAR file into this directory as \`${project.jarFileName}\`.
2. Copy \`.env.example\` to \`.env\` and update values for your environment.
3. Run \`chmod +x scripts/*.sh\`.
4. Run \`./scripts/deploy.sh\`.
5. Open \`http://localhost:${project.serverPort}\`.

## Operations

- Logs: \`./scripts/logs.sh\`
- Restart: \`./scripts/restart.sh\`
- Stop: \`docker compose down\`

## Security Notes

Review all generated settings before production use. Do not commit \`.env\` files with secrets.
`;
}

function mysqlRedisReadme({ project, database, redis }: GenerateRequest) {
  return `
# ${project.projectName} Docker Compose Deployment

This package runs \`${project.projectName}\` with MySQL and Redis.

## Requirements

- Docker
- Docker Compose v2
- A Spring Boot JAR named \`${project.jarFileName}\`

## Quick Start

1. Put \`${project.jarFileName}\` in this directory.
2. Copy \`.env.example\` to \`.env\`.
3. Change default database and Redis passwords before production use.
4. Run \`chmod +x scripts/*.sh\`.
5. Run \`./scripts/deploy.sh\`.

## Services

- App: \`http://localhost:${project.serverPort}\`
- MySQL: \`localhost:${database.port}\`, database \`${database.databaseName}\`
- Redis: \`localhost:${redis.port}\`

## Common Issues

- If the app cannot connect to MySQL, wait for the MySQL healthcheck to pass and restart the app.
- If your application uses older Spring Boot Redis properties, rename \`SPRING_DATA_REDIS_*\` to \`SPRING_REDIS_*\`.
- Never expose MySQL or Redis ports publicly without firewall rules.
`;
}

function nginxReadme({ project, nginx }: GenerateRequest) {
  return `
# ${project.projectName} Nginx Deployment

This package runs a Spring Boot application behind an Nginx reverse proxy.

## Usage

1. Point \`${nginx.domain}\` to this server.
2. Put \`${project.jarFileName}\` in this directory.
3. Copy \`.env.example\` to \`.env\`.
4. Run \`chmod +x scripts/*.sh\`.
5. Run \`./scripts/deploy.sh\`.

## Files

- \`nginx/default.conf\`: reverse proxy configuration
- \`docker-compose.yml\`: app and Nginx services
- \`config/application-prod.yml\`: Spring Boot production profile

## Notes

This v1 template generates HTTP configuration. Add TLS with Certbot or your load balancer before production traffic.
`;
}

function nacosReadme({ project, nacos }: GenerateRequest) {
  return `
# ${project.projectName} Spring Cloud Nacos Deployment

This package runs a Spring Cloud application or gateway with a standalone Nacos service.

## Quick Start

1. Put \`${project.jarFileName}\` in this directory.
2. Copy \`.env.example\` to \`.env\`.
3. Change Nacos auth values before production use.
4. Run \`chmod +x scripts/*.sh\`.
5. Run \`./scripts/deploy.sh\`.
6. Open the Nacos console at \`http://localhost:${nacos.port}/nacos\`.

## Generated Config

- \`docker-compose.yml\`: app and Nacos stack
- \`nacos-docker-compose.yml\`: standalone Nacos compose file
- \`config/application-prod.yml\`: Spring Cloud Nacos config
- \`config/gateway-application.yml\`: Gateway route example

## Security Notes

The generated Nacos token and identity values are placeholders. Replace them with strong secrets before production.
`;
}
