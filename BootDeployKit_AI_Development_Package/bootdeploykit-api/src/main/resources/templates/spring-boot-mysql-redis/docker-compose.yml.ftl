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
      - "${project.serverPort?c}:${project.serverPort?c}"
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
      - "${database.port?c}:3306"
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
<#if redis.password?has_content>
    command: ["redis-server", "--requirepass", "${redis.password}"]
</#if>
    ports:
      - "${redis.port?c}:6379"
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
