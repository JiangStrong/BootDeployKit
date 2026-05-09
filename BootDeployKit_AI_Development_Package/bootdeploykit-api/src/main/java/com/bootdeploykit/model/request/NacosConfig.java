package com.bootdeploykit.model.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class NacosConfig {
    private boolean enabled;

    @Min(1)
    @Max(65535)
    private int port = 8848;

    @Size(max = 64)
    private String username = "nacos";

    @Size(max = 128)
    private String password = "nacos";

    @Pattern(regexp = "^standalone$", message = "Only standalone mode is supported in v1")
    private String mode = "standalone";

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }
}
