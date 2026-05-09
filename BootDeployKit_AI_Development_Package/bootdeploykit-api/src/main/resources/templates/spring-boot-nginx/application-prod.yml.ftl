server:
  port: ${project.serverPort?c}
  forward-headers-strategy: framework

spring:
  application:
    name: ${project.projectName}

logging:
  file:
    path: /app/logs
  level:
    root: INFO
