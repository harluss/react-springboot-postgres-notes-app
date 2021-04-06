package com.harluss.notes.controllers;

import com.harluss.notes.dtos.NoteResponse;
import com.harluss.notes.services.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${spring.data.rest.base-path}")
public class NotesController {

  @Autowired
  private NotesService notesService;

  @GetMapping("notes")
  public List<NoteResponse> getNotes() {

    return notesService.getNotes();
  }
}
