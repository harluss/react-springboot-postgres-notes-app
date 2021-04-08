package com.harluss.notes.controllers;

import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.mappers.MapStructMapper;
import com.harluss.notes.services.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${spring.data.rest.base-path}/notes")
public class NoteController {

  private final NoteService noteService;
  private final MapStructMapper mapper;

  public NoteController(final NoteService noteService, final MapStructMapper mapStructMapper) {
    this.noteService = noteService;
    this.mapper = mapStructMapper;
  }

  @GetMapping
  public ResponseEntity<List<NoteResponseDto>> getNotes() {

    return ResponseEntity.ok(
        mapper.noteEntityListToResponseDtoList(noteService.getNotes())
    );
  }
}
