package com.harluss.notes.exceptions;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class GlobalExceptionHandlerTest {

  private final GlobalExceptionHandler globalExceptionHandler = new GlobalExceptionHandler();

  @DisplayName("should handle uncaught exception")
  @Test
  void handleUncaughtException() {
    Exception exception = new RuntimeException("");

    ResponseEntity<ErrorResponse> errorResponse = globalExceptionHandler.handleUncaughtException(exception, null);

    assertThat(errorResponse.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    if (errorResponse.getBody() != null) {
      assertThat(errorResponse.getBody().getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR.value());
      assertThat(errorResponse.getBody().getMessage()).isEqualTo("Unknown error occurred");
    }
  }
}
