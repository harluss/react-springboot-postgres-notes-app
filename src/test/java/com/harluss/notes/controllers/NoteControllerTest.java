package com.harluss.notes.controllers;

import com.harluss.notes.dtos.NoteCreateRequestDto;
import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.mappers.NoteMapper;
import com.harluss.notes.services.NoteService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NoteControllerTest {

  @Mock
  private NoteService mockNoteService;

  @Mock
  private NoteMapper mockMapper;

  @InjectMocks
  private NoteController noteController;

  @DisplayName("should return a list of notes")
  @Test
  void getNotes() {
    List<NoteEntity> noteEntities = Arrays.asList(NoteEntity.builder().build());
    List<NoteResponseDto> noteDtos = Arrays.asList(NoteResponseDto.builder().build());
    when(mockNoteService.getAll()).thenReturn(noteEntities);
    when(mockMapper.entityListToResponseDtoList(noteEntities)).thenReturn(noteDtos);

    ResponseEntity<List<NoteResponseDto>> response = noteController.getNotes();

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(response.getBody())
        .hasSize(1)
        .hasAtLeastOneElementOfType(NoteResponseDto.class);
  }

  @DisplayName("should return a note with matching id")
  @Test
  void getNoteById() {
    final Long id = 2L;
    NoteEntity noteEntity = NoteEntity.builder().id(id).build();
    NoteResponseDto noteDto = NoteResponseDto.builder().id(id).build();
    when(mockNoteService.getById(id)).thenReturn(noteEntity);
    when(mockMapper.entityToResponseDto(noteEntity)).thenReturn(noteDto);

    ResponseEntity<NoteResponseDto> response = noteController.getNoteById(id);

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(response.getBody())
        .hasFieldOrPropertyWithValue("id", id)
        .isInstanceOf(NoteResponseDto.class);
  }

  @DisplayName("should return saved note")
  @Test
  void saveNote() {
    NoteCreateRequestDto noteRequest = NoteCreateRequestDto.builder().build();
    NoteEntity noteEntity = NoteEntity.builder().build();
    NoteResponseDto noteResponse = NoteResponseDto.builder().build();
    when(mockMapper.createRequestDtoToEntity(noteRequest)).thenReturn(noteEntity);
    when(mockNoteService.save(noteEntity)).thenReturn(noteEntity);
    when(mockMapper.entityToResponseDto(noteEntity)).thenReturn(noteResponse);

    ResponseEntity<NoteResponseDto> response = noteController.saveNote(noteRequest);

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    assertThat(response.getBody()).isInstanceOf(NoteResponseDto.class);
  }
}
