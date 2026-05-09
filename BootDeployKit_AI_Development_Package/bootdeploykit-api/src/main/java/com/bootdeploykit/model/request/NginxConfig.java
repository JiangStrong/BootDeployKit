package com.bootdeploykit.model.request;

import jakarta.validation.constraints.Pattern;

public class NginxConfig {
    private boolean enabled;

    @Pattern(regexp = "^$|^([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$|^localhost$", message = "domain must be a hostname without protocol")
    private String domain = "example.com";

    private boolean https;

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public boolean isHttps() {
        return https;
    }

    public void setHttps(boolean https) {
        this.https = https;
    }
}
