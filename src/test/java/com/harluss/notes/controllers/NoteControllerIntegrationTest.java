package com.harluss.notes.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.harluss.notes.dtos.NoteCreateRequestDto;
import com.harluss.notes.dtos.NoteUpdateRequestDto;
import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.repositories.NoteRepository;
import com.harluss.notes.utilities.PostgresTestContainer;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class NoteControllerIntegrationTest extends PostgresTestContainer {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private NoteRepository noteRepository;

  @DisplayName("should return list of notes")
  @Test
  void getNotes_happyPath() throws Exception {
    final long count = noteRepository.count();

    mockMvc.perform(MockMvcRequestBuilders.get("/api/notes"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(count));
  }

  @DisplayName("should return a note with given id")
  @Test
  void getNoteById_happyPath() throws Exception {
    final NoteEntity existingNote = noteRepository.findAll().get(0);

    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/notes/{id}", existingNote.getId()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.title").isNotEmpty())
        .andExpect(jsonPath("$.details").isNotEmpty())
        .andExpect(jsonPath("$.isPinned").isNotEmpty())
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
  }

  @DisplayName("should save and return new note")
  @Test
  void saveNote_happyPath() throws Exception {
    final NoteCreateRequestDto noteRequest = NoteCreateRequestDto.builder().title("Good news, everyone!").details("Today you'll be delivering a crate of subpoenas to Sicily 8, the Mob Planet!").isPinned(true).build();

    mockMvc.perform(MockMvcRequestBuilders.post("/api/notes")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(noteRequest)))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.title").value(noteRequest.getTitle()))
        .andExpect(jsonPath("$.details").value(noteRequest.getDetails()))
        .andExpect(jsonPath("$.isPinned").value(noteRequest.getIsPinned()))
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
  }

  @DisplayName("should update and return updated note with given id")
  @Test
  void updateNote_happyPath() throws Exception {
    final NoteUpdateRequestDto noteUpdateRequest = NoteUpdateRequestDto.builder().title("Bad news, nobody.").details("The super collider super-exploded.").isPinned(true).build();
    final NoteEntity existingNote = noteRepository.findAll().get(0);

    mockMvc.perform(MockMvcRequestBuilders.put("/api/notes/{id}", existingNote.getId())
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(noteUpdateRequest)))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.id").value(existingNote.getId()))
        .andExpect(jsonPath("$.title").value(noteUpdateRequest.getTitle()))
        .andExpect(jsonPath("$.details").value(noteUpdateRequest.getDetails()))
        .andExpect(jsonPath("$.isPinned").value(noteUpdateRequest.getIsPinned()))
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
//        .andExpect(jsonPath("$.createdAt").value(convertDateToZoneDateTimeString(existingNote.getCreatedAt())))
//        .andExpect(jsonPath("$.updatedAt").value(greaterThan(convertDateToZoneDateTimeString(existingNote.getUpdatedAt()))));
  }

  @DisplayName("should delete note with given id")
  @Test
  void deleteNote_happyPath() throws Exception {
    final NoteEntity existingNote = noteRepository.findAll().get(0);

    mockMvc.perform(MockMvcRequestBuilders.delete("/api/notes/{id}", existingNote.getId()))
        .andDo(print())
        .andExpect(status().isNoContent())
        .andExpect(jsonPath("$").doesNotHaveJsonPath());
  }

  private String convertDateToZoneDateTimeString(Date date) {
    return ZonedDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault()).toOffsetDateTime().toString();
  }
}
