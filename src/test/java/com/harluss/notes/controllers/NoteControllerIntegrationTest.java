package com.harluss.notes.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.utilities.PostgresTestContainer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class NoteControllerIntegrationTest extends PostgresTestContainer {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @DisplayName("should return list of notes")
  @Test
  void getNotes() throws Exception {

    mockMvc
        .perform(MockMvcRequestBuilders.get("/api/notes"))
        .andDo(print())
        .andExpect(status().isOk());
  }

  @DisplayName("should return a note with given id")
  @Test
  void getNoteById() throws Exception {
    final long noteId = 1;

    MvcResult result = mockMvc
        .perform(MockMvcRequestBuilders.get("/api/notes/{id}", noteId))
        .andDo(print())
        .andExpect(status().isOk())
        .andReturn();

    NoteResponseDto note = objectMapper.readValue(result.getResponse().getContentAsString(), NoteResponseDto.class);
    assertThat(note.getId()).isEqualTo(noteId);
  }
}
