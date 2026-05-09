import type { GenerateRequest, TemplateType } from "@/types/generator";

export const siteUrl = "https://bootdeploykit.com";

export const javaVersions = ["8", "11", "17", "21", "25"] as const;

export const templates: Array<{
  code: TemplateType;
  name: string;
  description: string;
}> = [
  {
    code: "SPRING_BOOT_BASIC",
    name: "Spring Boot Basic",
    description: "Single Spring Boot app with Dockerfile, Compose, env and production YAML."
  },
  {
    code: "SPRING_BOOT_MYSQL_REDIS",
    name: "Spring Boot + MySQL + Redis",
    description: "Application stack with MySQL, Redis, health checks and persistent volumes."
  },
  {
    code: "SPRING_BOOT_NGINX",
    name: "Spring Boot + Nginx",
    description: "Reverse proxy template for running Spring Boot behind Nginx."
  },
  {
    code: "SPRING_CLOUD_NACOS",
    name: "Spring Cloud + Nacos",
    description: "Gateway-oriented Spring Cloud deployment with standalone Nacos."
  }
];

export const defaultRequest: GenerateRequest = {
  templateType: "SPRING_BOOT_MYSQL_REDIS",
  project: {
    projectName: "demo-api",
    jarFileName: "demo-api.jar",
    javaVersion: "17",
    serverPort: 8080,
    springProfile: "prod",
    logPath: "./logs",
    dockerNetwork: "app-network"
  },
  database: {
    enabled: true,
    type: "mysql",
    databaseName: "demo_db",
    username: "demo",
    password: "demo_password",
    rootPassword: "root_password",
    port: 3306
  },
  redis: {
    enabled: true,
    port: 6379,
    password: ""
  },
  nginx: {
    enabled: false,
    domain: "example.com",
    https: false
  },
  nacos: {
    enabled: false,
    port: 8848,
    username: "nacos",
    password: "nacos",
    mode: "standalone"
  }
};
