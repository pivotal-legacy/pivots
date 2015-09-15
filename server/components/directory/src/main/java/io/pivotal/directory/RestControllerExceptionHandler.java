package io.pivotal.directory;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@ControllerAdvice
public class RestControllerExceptionHandler {

    @ExceptionHandler(RestControllerException.class)
    @ResponseStatus(NOT_FOUND)
    public ResourceError resourceNotFound(RestControllerException e) {
        return new ResourceError(e.getMessage());
    }

}
