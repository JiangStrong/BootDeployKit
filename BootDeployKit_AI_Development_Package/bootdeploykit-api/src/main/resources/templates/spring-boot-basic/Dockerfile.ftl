FROM eclipse-temurin:${project.javaVersion}-jre

WORKDIR /app

COPY ${project.jarFileName} app.jar

ENV SPRING_PROFILES_ACTIVE=${project.springProfile}

EXPOSE ${project.serverPort?c}

ENTRYPOINT ["java", "-jar", "app.jar"]
