package com.harluss.notes.controllers;

import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.mappers.NoteMapper;
import com.harluss.notes.services.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Notes", description = "Note related endpoints")
@RestController
@RequestMapping("/api/notes")
public class NoteController {

  private final NoteService noteService;
  private final NoteMapper mapper;

  public NoteController(final NoteService noteService, final NoteMapper noteMapper) {
    this.noteService = noteService;
    this.mapper = noteMapper;
  }

  @Operation(summary = "Get all notes")
  @GetMapping(produces = "application/json")
  public ResponseEntity<List<NoteResponseDto>> getNotes() {

    return ResponseEntity.ok(
        mapper.entityListToResponseDtoList(noteService.getNotes())
    );
  }
}
