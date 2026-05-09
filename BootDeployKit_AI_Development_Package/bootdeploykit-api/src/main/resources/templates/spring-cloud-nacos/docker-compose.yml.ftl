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
      - "${nacos.port?c}:8848"
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
