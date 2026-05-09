SPRING_PROFILES_ACTIVE=${project.springProfile}
SERVER_PORT=${project.serverPort?c}
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/${database.databaseName}?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false
SPRING_DATASOURCE_USERNAME=${database.username}
SPRING_DATASOURCE_PASSWORD=${database.password}
SPRING_DATA_REDIS_HOST=redis
SPRING_DATA_REDIS_PORT=6379
<#if redis.password?has_content>
SPRING_DATA_REDIS_PASSWORD=${redis.password}
</#if>
