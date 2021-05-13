package com.harluss.notes.exceptions;

import lombok.extern.log4j.Log4j2;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException exception, WebRequest request) {

    return buildErrorResponse(HttpStatus.NOT_FOUND, exception.getMessage());
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<ErrorResponse> handleUncaughtException(Exception exception, WebRequest request) {
    log.error("SOMETHING WENT WRONG: ", exception);
    final String errorMessage = "Unknown error occurred";

    return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, errorMessage);
  }

  @Override
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception, HttpHeaders headers, HttpStatus status, WebRequest request) {
    final String errorMessage = "Validation error, check 'errors' field for details";

    return buildErrorResponse(HttpStatus.BAD_REQUEST, errorMessage, exception.getBindingResult());
  }

  @Override
  protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
    ErrorResponse errorResponse = new ErrorResponse(status.value(), ex.getMessage());

    return ResponseEntity.status(status).body(errorResponse);
  }

  private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus httpStatus, String message) {
    ErrorResponse errorResponse = new ErrorResponse(httpStatus.value(), message);

    return ResponseEntity.status(httpStatus.value()).body(errorResponse);
  }

  private ResponseEntity<Object> buildErrorResponse(HttpStatus httpStatus, String message, BindingResult bindingResult) {
    ErrorResponse errorResponse = new ErrorResponse(httpStatus.value(), message);
    Map<String, String> errors = new HashMap<>();

    for (FieldError fieldError : bindingResult.getFieldErrors()) {
      errors.put(fieldError.getField(), fieldError.getDefaultMessage());
    }
    errorResponse.setValidationErrors(errors);

    return ResponseEntity.status(httpStatus.value()).body(errorResponse);
  }

}
