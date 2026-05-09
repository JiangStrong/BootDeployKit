package com.bootdeploykit.model.response;

public class GeneratedFile {
    private String path;
    private String language;
    private String content;

    public GeneratedFile() {
    }

    public GeneratedFile(String path, String language, String content) {
        this.path = path;
        this.language = language;
        this.content = content;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
