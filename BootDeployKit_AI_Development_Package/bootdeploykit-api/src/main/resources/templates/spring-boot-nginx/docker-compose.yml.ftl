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
      - "${project.serverPort?c}"
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
