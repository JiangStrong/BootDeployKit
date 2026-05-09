server:
  port: ${project.serverPort?c}

spring:
  application:
    name: ${project.projectName}
  datasource:
    url: ${r"${SPRING_DATASOURCE_URL}"}
    username: ${r"${SPRING_DATASOURCE_USERNAME}"}
    password: ${r"${SPRING_DATASOURCE_PASSWORD}"}
    driver-class-name: com.mysql.cj.jdbc.Driver
  data:
    redis:
      host: ${r"${SPRING_DATA_REDIS_HOST:redis}"}
      port: ${r"${SPRING_DATA_REDIS_PORT:6379}"}
<#if redis.password?has_content>
      password: ${r"${SPRING_DATA_REDIS_PASSWORD}"}
</#if>

logging:
  file:
    path: /app/logs
  level:
    root: INFO
