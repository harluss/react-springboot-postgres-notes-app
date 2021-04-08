package com.harluss.notes.exceptions;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<ErrorResponse> handleUncaughtException(Exception exception, WebRequest request) {
    log.error("SOMETHING WENT WRONG: ", exception);

    return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Unknown error occurred");
  }

  private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus httpStatus, String message) {
    ErrorResponse errorResponse = new ErrorResponse(httpStatus.value(), message);

    return ResponseEntity.status(httpStatus.value()).body(errorResponse);
  }
}
