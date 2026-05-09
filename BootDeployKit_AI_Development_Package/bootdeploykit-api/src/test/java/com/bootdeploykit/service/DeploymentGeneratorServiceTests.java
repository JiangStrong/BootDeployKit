package com.bootdeploykit.service;

import com.bootdeploykit.exception.BizException;
import com.bootdeploykit.model.enums.TemplateType;
import com.bootdeploykit.model.request.GenerateRequest;
import com.bootdeploykit.model.response.GeneratedFile;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipInputStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
class DeploymentGeneratorServiceTests {
    private static final List<String> BASE_PATHS = List.of(
            "Dockerfile",
            "docker-compose.yml",
            ".env.example",
            "config/application-prod.yml",
            "scripts/deploy.sh",
            "scripts/restart.sh",
            "scripts/logs.sh",
            "README.md"
    );

    @Autowired
    private DeploymentGeneratorService generatorService;

    @Autowired
    private ZipPackageService zipPackageService;

    @Test
    void rendersExpectedFilesForEveryTemplateAndPackagesThem() throws IOException {
        Map<TemplateType, List<String>> extraPaths = Map.of(
                TemplateType.SPRING_BOOT_BASIC, List.of(),
                TemplateType.SPRING_BOOT_MYSQL_REDIS, List.of(),
                TemplateType.SPRING_BOOT_NGINX, List.of("nginx/default.conf"),
                TemplateType.SPRING_CLOUD_NACOS, List.of("config/gateway-application.yml", "nacos-docker-compose.yml")
        );

        for (TemplateType templateType : TemplateType.values()) {
            GenerateRequest request = sampleRequest(templateType);
            List<GeneratedFile> files = generatorService.generate(request);
            List<String> expectedPaths = new java.util.ArrayList<>(BASE_PATHS);
            expectedPaths.addAll(extraPaths.get(templateType));

            assertThat(files)
                    .extracting(GeneratedFile::getPath)
                    .containsExactlyInAnyOrderElementsOf(expectedPaths);
            assertThat(content(files, "Dockerfile")).contains("COPY demo-api.jar app.jar");
            assertThat(content(files, "docker-compose.yml"))
                    .contains("demo-api")
                    .contains("8080")
                    .doesNotContain("8,080");
            assertThat(files)
                    .extracting(GeneratedFile::getContent)
                    .allSatisfy(content -> assertThat(content)
                            .doesNotContain("8,080")
                            .doesNotStartWith("\uFEFF"));

            byte[] zip = zipPackageService.packageFiles(files);
            assertThat(zipEntryNames(zip)).containsExactlyInAnyOrderElementsOf(expectedPaths);
        }
    }

    @Test
    void rendersAllSupportedJavaRuntimeVersions() {
        for (String javaVersion : List.of("8", "11", "17", "21", "25")) {
            GenerateRequest request = sampleRequest(TemplateType.SPRING_BOOT_BASIC);
            request.getProject().setJavaVersion(javaVersion);

            List<GeneratedFile> files = generatorService.generate(request);

            assertThat(content(files, "Dockerfile")).contains("eclipse-temurin:" + javaVersion + "-jre");
        }
    }

    @Test
    void rejectsUnsafeZipPaths() {
        List<GeneratedFile> files = List.of(new GeneratedFile("../bad.txt", "text", "bad"));

        assertThatThrownBy(() -> zipPackageService.packageFiles(files))
                .isInstanceOf(BizException.class)
                .hasMessageContaining("Invalid generated file path");
    }

    private GenerateRequest sampleRequest(TemplateType templateType) {
        GenerateRequest request = new GenerateRequest();
        request.setTemplateType(templateType);
        request.getProject().setProjectName("demo-api");
        request.getProject().setJarFileName("demo-api.jar");
        request.getProject().setJavaVersion("17");
        request.getProject().setServerPort(8080);
        request.getProject().setSpringProfile("prod");
        request.getProject().setDockerNetwork("app-network");
        request.getDatabase().setEnabled(templateType == TemplateType.SPRING_BOOT_MYSQL_REDIS);
        request.getRedis().setEnabled(templateType == TemplateType.SPRING_BOOT_MYSQL_REDIS);
        return request;
    }

    private String content(List<GeneratedFile> files, String path) {
        return files.stream()
                .filter(file -> path.equals(file.getPath()))
                .findFirst()
                .map(GeneratedFile::getContent)
                .orElseThrow();
    }

    private List<String> zipEntryNames(byte[] zip) throws IOException {
        List<String> names = new java.util.ArrayList<>();
        try (ZipInputStream stream = new ZipInputStream(new ByteArrayInputStream(zip))) {
            for (var entry = stream.getNextEntry(); entry != null; entry = stream.getNextEntry()) {
                names.add(entry.getName());
            }
        }
        return names;
    }
}
