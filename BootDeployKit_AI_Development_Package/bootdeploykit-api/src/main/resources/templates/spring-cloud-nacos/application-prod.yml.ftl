server:
  port: ${project.serverPort?c}

spring:
  application:
    name: ${project.projectName}
  cloud:
    nacos:
      discovery:
        server-addr: ${r"${SPRING_CLOUD_NACOS_DISCOVERY_SERVER_ADDR:nacos:8848}"}
        username: ${r"${SPRING_CLOUD_NACOS_USERNAME:nacos}"}
        password: ${r"${SPRING_CLOUD_NACOS_PASSWORD:nacos}"}
      config:
        server-addr: ${r"${SPRING_CLOUD_NACOS_CONFIG_SERVER_ADDR:nacos:8848}"}
        username: ${r"${SPRING_CLOUD_NACOS_USERNAME:nacos}"}
        password: ${r"${SPRING_CLOUD_NACOS_PASSWORD:nacos}"}

logging:
  file:
    path: /app/logs
