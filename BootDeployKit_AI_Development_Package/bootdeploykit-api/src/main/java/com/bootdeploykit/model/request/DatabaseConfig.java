package com.bootdeploykit.model.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class DatabaseConfig {
    private boolean enabled;

    @Pattern(regexp = "^mysql$", message = "Only mysql is supported in v1")
    private String type = "mysql";

    @Size(max = 64)
    @Pattern(regexp = "^[A-Za-z0-9_]*$")
    private String databaseName = "demo_db";

    @Size(max = 64)
    @Pattern(regexp = "^[A-Za-z0-9_]*$")
    private String username = "demo";

    @Size(max = 128)
    private String password = "change_me";

    @Size(max = 128)
    private String rootPassword = "change_root_password";

    @Min(1)
    @Max(65535)
    private int port = 3306;

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
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

    public String getRootPassword() {
        return rootPassword;
    }

    public void setRootPassword(String rootPassword) {
        this.rootPassword = rootPassword;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }
}
