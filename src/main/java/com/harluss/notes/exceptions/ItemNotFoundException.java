package com.harluss.notes.exceptions;

public class ItemNotFoundException extends RuntimeException {

  public ItemNotFoundException(String message) {
    super(message);
  }
}
