server:
  port: ${project.serverPort?c}

spring:
  application:
    name: ${project.projectName}

logging:
  file:
    path: /app/logs
  level:
    root: INFO
