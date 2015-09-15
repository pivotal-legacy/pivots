package io.pivotal.directory;

public class RestControllerException extends RuntimeException {
    private String message;

    public RestControllerException(String errorMessage) {
        this.message = errorMessage;
    }

    public String getMessage() {
        return message;
    }
}
