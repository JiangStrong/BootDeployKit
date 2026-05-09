package com.bootdeploykit.model.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ProjectConfig {
    @NotBlank
    @Size(min = 2, max = 50)
    @Pattern(regexp = "^[a-z0-9][a-z0-9-]*[a-z0-9]$", message = "projectName must use lowercase letters, numbers and hyphens")
    private String projectName = "demo-api";

    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9._-]+\\.jar$", message = "jarFileName must end with .jar")
    private String jarFileName = "demo-api.jar";

    @NotBlank
    @Pattern(regexp = "^(8|11|17|21|25)$", message = "javaVersion must be 8, 11, 17, 21 or 25")
    private String javaVersion = "17";

    @Min(1)
    @Max(65535)
    private int serverPort = 8080;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9._-]+$")
    private String springProfile = "prod";

    @NotBlank
    private String logPath = "./logs";

    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9_-]+$")
    private String dockerNetwork = "app-network";

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getJarFileName() {
        return jarFileName;
    }

    public void setJarFileName(String jarFileName) {
        this.jarFileName = jarFileName;
    }

    public String getJavaVersion() {
        return javaVersion;
    }

    public void setJavaVersion(String javaVersion) {
        this.javaVersion = javaVersion;
    }

    public int getServerPort() {
        return serverPort;
    }

    public void setServerPort(int serverPort) {
        this.serverPort = serverPort;
    }

    public String getSpringProfile() {
        return springProfile;
    }

    public void setSpringProfile(String springProfile) {
        this.springProfile = springProfile;
    }

    public String getLogPath() {
        return logPath;
    }

    public void setLogPath(String logPath) {
        this.logPath = logPath;
    }

    public String getDockerNetwork() {
        return dockerNetwork;
    }

    public void setDockerNetwork(String dockerNetwork) {
        this.dockerNetwork = dockerNetwork;
    }
}
