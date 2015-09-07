package io.pivotal.directory;

public class ResourceError {

    private String error;

    public ResourceError(String error) {
        this.error = error;
    }

    // Getter for Jackson JSON serialization
    @SuppressWarnings("unused")
    public String getError() {
        return error;
    }

}
