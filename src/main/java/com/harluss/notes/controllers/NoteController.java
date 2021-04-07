package com.harluss.notes.controllers;

import com.harluss.notes.dtos.NoteResponse;
import com.harluss.notes.services.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${spring.data.rest.base-path}/notes")
public class NoteController {

  private final NoteService noteService;

  public NoteController(NoteService noteService) {
    this.noteService = noteService;
  }

  @GetMapping
  public ResponseEntity<List<NoteResponse>> getNotes() {
    return new ResponseEntity<>(noteService.getNotes(), HttpStatus.OK);
  }
}
