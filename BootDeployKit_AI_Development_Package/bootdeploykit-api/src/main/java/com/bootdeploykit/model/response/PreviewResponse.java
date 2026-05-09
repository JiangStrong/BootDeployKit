package com.bootdeploykit.model.response;

import java.util.List;

public class PreviewResponse {
    private List<GeneratedFile> files;

    public PreviewResponse() {
    }

    public PreviewResponse(List<GeneratedFile> files) {
        this.files = files;
    }

    public List<GeneratedFile> getFiles() {
        return files;
    }

    public void setFiles(List<GeneratedFile> files) {
        this.files = files;
    }
}
