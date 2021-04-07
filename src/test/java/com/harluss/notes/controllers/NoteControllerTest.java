package com.harluss.notes.controllers;

import com.harluss.notes.dtos.NoteResponse;
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

  @InjectMocks
  private NoteController noteController;

  @DisplayName("should return notes with status 200")
  @Test
  void getNotes() {
    List<NoteResponse> notes = Arrays.asList(NoteResponse.builder().build());
    when(mockNoteService.getNotes()).thenReturn(notes);

    ResponseEntity<List<NoteResponse>> response = noteController.getNotes();

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(response.getBody()).hasSize(1);
  }
}
