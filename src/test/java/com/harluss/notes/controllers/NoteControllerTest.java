package com.harluss.notes.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.harluss.notes.constants.NoteApiConstants;
import com.harluss.notes.dtos.NoteCreateRequestDto;
import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.dtos.NoteUpdateRequestDto;
import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.exceptions.NotFoundException;
import com.harluss.notes.mappers.NoteMapper;
import com.harluss.notes.services.NoteService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@WebMvcTest(NoteController.class)
class NoteControllerTest {

  @MockBean
  private NoteService mockNoteService;

  @MockBean
  private NoteMapper mockMapper;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @DisplayName("should return a list of notes")
  @Test
  void getNotes() throws Exception {
    List<NoteEntity> noteEntities = Arrays.asList(NoteEntity.builder().build());
    List<NoteResponseDto> noteDtos = Arrays.asList(NoteResponseDto.builder().build());
    when(mockNoteService.getAll()).thenReturn(noteEntities);
    when(mockMapper.entityListToResponseDtoList(noteEntities)).thenReturn(noteDtos);

    mockMvc.perform(MockMvcRequestBuilders.get("/api/notes"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$", hasSize(noteDtos.size())));
  }

  @DisplayName("should return an empty list of notes when no notes exist")
  @Test
  void getNotes_empty() throws Exception {
    when(mockNoteService.getAll()).thenReturn(Collections.emptyList());
    when(mockMapper.entityListToResponseDtoList(Collections.emptyList())).thenReturn(Collections.emptyList());

    mockMvc.perform(MockMvcRequestBuilders.get("/api/notes"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$").isEmpty());
  }

  @DisplayName("should return a note with given id")
  @Test
  void getNoteById() throws Exception {
    final long noteId = 2;
    NoteEntity noteEntity = NoteEntity.builder().build();
    NoteResponseDto noteDto = NoteResponseDto.builder().build();
    when(mockNoteService.getById(noteId)).thenReturn(noteEntity);
    when(mockMapper.entityToResponseDto(noteEntity)).thenReturn(noteDto);

    mockMvc.perform(MockMvcRequestBuilders.get("/api/notes/{id}", noteId))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isNotEmpty());
  }

  @DisplayName("should return 404 Not Found when note not found")
  @Test
  void getNoteById_NotFound() throws Exception {
    final long noteId = 99;
    final String errorMessage = String.format(NoteApiConstants.NOTE_NOT_FOUND, noteId);
    when(mockNoteService.getById(noteId)).thenThrow(new NotFoundException(errorMessage));

    mockMvc.perform(MockMvcRequestBuilders.get("/api/notes/{id}", noteId))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().string(containsString(errorMessage)));
  }

  @DisplayName("should saved and return new note")
  @Test
  void saveNote() throws Exception {
    NoteCreateRequestDto noteRequest = NoteCreateRequestDto.builder().title("title").details("details").isPinned(false).build();
    NoteEntity noteEntity = NoteEntity.builder().build();
    NoteResponseDto noteResponse = NoteResponseDto.builder().build();
    when(mockMapper.createRequestDtoToEntity(noteRequest)).thenReturn(noteEntity);
    when(mockNoteService.save(noteEntity)).thenReturn(noteEntity);
    when(mockMapper.entityToResponseDto(noteEntity)).thenReturn(noteResponse);

    mockMvc.perform(MockMvcRequestBuilders.post("/api/notes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(noteRequest)))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isNotEmpty());
  }

  @DisplayName("should update and return an existing note with given id")
  @Test
  void update() throws Exception {
    final long noteId = 2;
    NoteUpdateRequestDto noteRequest = NoteUpdateRequestDto.builder().title("title").details("details").isPinned(false).build();
    NoteEntity noteEntity = NoteEntity.builder().build();
    NoteResponseDto noteResponse = NoteResponseDto.builder().build();
    when(mockNoteService.update(noteRequest, noteId)).thenReturn(noteEntity);
    when(mockMapper.entityToResponseDto(noteEntity)).thenReturn(noteResponse);

    mockMvc.perform(MockMvcRequestBuilders.put("/api/notes/{id}", noteId)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(noteRequest)))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isNotEmpty());
  }

  @DisplayName("should return 404 Not Found when note to be updated not found")
  @Test
  void update_NotFound() throws Exception {
    final long noteId = 99;
    final String errorMessage = String.format(NoteApiConstants.NOTE_NOT_FOUND, noteId);
    NoteUpdateRequestDto noteRequest = NoteUpdateRequestDto.builder().title("title").details("details").isPinned(false).build();
    when(mockNoteService.update(noteRequest, noteId)).thenThrow(new NotFoundException(errorMessage));

    mockMvc.perform(MockMvcRequestBuilders.put("/api/notes/{id}", noteId)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(noteRequest)))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().string(containsString(errorMessage)));
  }

  @DisplayName("should delete a note with given id")
  @Test
  void delete() throws Exception {
    final long noteId = 2;
    doNothing().when(mockNoteService).delete(anyLong());

    mockMvc.perform(MockMvcRequestBuilders.delete("/api/notes/{id}", noteId))
        .andDo(print())
        .andExpect(status().isNoContent())
        .andExpect(jsonPath("$").doesNotHaveJsonPath());

    verify(mockNoteService, times(1)).delete(noteId);
  }

  @DisplayName("should return 404 Not Found when note to be deleted not found")
  @Test
  void delete_NotFound() throws Exception {
    final long noteId = 99;
    final String errorMessage = String.format(NoteApiConstants.NOTE_NOT_FOUND, noteId);
    doThrow(new NotFoundException(errorMessage)).when(mockNoteService).delete(noteId);

    mockMvc.perform(MockMvcRequestBuilders.delete("/api/notes/{id}", noteId))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().string(containsString(errorMessage)));
  }
}
