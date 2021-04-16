package com.harluss.notes.controllers;

import com.harluss.notes.dtos.NoteCreateRequestDto;
import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.dtos.NoteUpdateRequestDto;
import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.mappers.NoteMapper;
import com.harluss.notes.services.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
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
    List<NoteResponseDto> noteResponses = mapper.entityListToResponseDtoList(noteService.getAll());

    return ResponseEntity.ok(noteResponses);
  }

  @Operation(summary = "Get note by provided Id")
  @GetMapping(value = "/{id}", produces = "application/json")
  public ResponseEntity<NoteResponseDto> getNoteById(@PathVariable long id) {
    NoteResponseDto noteResponse = mapper.entityToResponseDto(noteService.getById(id));

    return ResponseEntity.ok(noteResponse);
  }

  @Operation(summary = "Save new note")
  @PostMapping
  public ResponseEntity<NoteResponseDto> saveNote(@Valid @RequestBody NoteCreateRequestDto noteRequest) {
    NoteEntity noteEntity = mapper.createRequestDtoToEntity(noteRequest);
    NoteResponseDto noteResponse = mapper.entityToResponseDto(noteService.save(noteEntity));

    return ResponseEntity.status(HttpStatus.CREATED).body(noteResponse);
  }

  @Operation(summary = "Update note")
  @PutMapping(value = "/{id}", produces = "application/json")
  public ResponseEntity<NoteResponseDto> updateNote(
      @Valid @RequestBody NoteUpdateRequestDto noteRequest,
      @NotBlank @PathVariable long id
  ) {
    NoteResponseDto noteResponse = mapper.entityToResponseDto(noteService.update(noteRequest, id));

    return ResponseEntity.status(HttpStatus.OK).body(noteResponse);
  }
}
