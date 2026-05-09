server:
  port: ${project.serverPort?c}

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
