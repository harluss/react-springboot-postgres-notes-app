package com.harluss.notes.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
  private final Integer status;
  private final String message;
}
