package com.harluss.notes.controllers;

import com.harluss.notes.dtos.NoteCreateRequestDto;
import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.dtos.NoteUpdateRequestDto;
import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.mappers.NoteMapper;
import com.harluss.notes.services.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.UUID;

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
  @ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = NoteResponseDto.class))))
  @GetMapping
  public ResponseEntity<List<NoteResponseDto>> getNotes() {
    List<NoteResponseDto> noteResponses = mapper.entityListToResponseDtoList(noteService.getAll());

    return ResponseEntity.status(HttpStatus.OK).body(noteResponses);
  }

  @Operation(summary = "Get note with given Id")
  @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = NoteResponseDto.class)) })
  @GetMapping(value = "/{id}")
  public ResponseEntity<NoteResponseDto> getNoteById(@PathVariable UUID id) {
    NoteResponseDto noteResponse = mapper.entityToResponseDto(noteService.getById(id));

    return ResponseEntity.status(HttpStatus.OK).body(noteResponse);
  }

  @Operation(summary = "Save new note")
  @ApiResponse(responseCode = "201", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = NoteResponseDto.class)) })
  @PostMapping
  public ResponseEntity<NoteResponseDto> saveNote(@Valid @RequestBody NoteCreateRequestDto noteCreateRequest) {
    NoteEntity noteEntity = mapper.createRequestDtoToEntity(noteCreateRequest);
    NoteResponseDto noteResponse = mapper.entityToResponseDto(noteService.save(noteEntity));

    return ResponseEntity.status(HttpStatus.CREATED).body(noteResponse);
  }

  @Operation(summary = "Update note with given Id")
  @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = NoteResponseDto.class)) })
  @PutMapping(value = "/{id}")
  public ResponseEntity<NoteResponseDto> updateNote(
      @Valid @RequestBody NoteUpdateRequestDto noteUpdateRequest,
      @NotBlank @PathVariable UUID id
  ) {
    NoteResponseDto noteResponse = mapper.entityToResponseDto(noteService.update(noteUpdateRequest, id));

    return ResponseEntity.status(HttpStatus.OK).body(noteResponse);
  }

  @Operation(summary = "Delete note with given Id")
  @ApiResponse(responseCode = "204")
  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Void> deleteNote(@NotBlank @PathVariable UUID id) {
    noteService.delete(id);

    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
