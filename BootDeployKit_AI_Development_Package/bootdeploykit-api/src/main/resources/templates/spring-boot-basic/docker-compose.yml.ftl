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
    networks:
      - ${project.dockerNetwork}

networks:
  ${project.dockerNetwork}:
    driver: bridge
