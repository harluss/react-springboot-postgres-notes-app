package com.harluss.notes.services;

import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.exceptions.ItemNotFoundException;
import com.harluss.notes.repositories.NoteRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NoteServiceImplTest {

  @Mock
  private NoteRepository mockNoteRepository;

  @InjectMocks
  private NoteServiceImpl noteService;

  @DisplayName("should return list of notes")
  @Test
  void getNotes() {
    List<NoteEntity> noteEntities = Arrays.asList(NoteEntity.builder().build());
    when(mockNoteRepository.findAll()).thenReturn(noteEntities);

    List<NoteEntity> notes = noteService.getNotes();

    verify(mockNoteRepository, times(1)).findAll();
    assertThat(notes)
        .isNotEmpty()
        .hasAtLeastOneElementOfType(NoteEntity.class);
  }

  @DisplayName("should return empty list when no notes found")
  @Test
  void getNotesEmpty() {
    when(mockNoteRepository.findAll()).thenReturn(Collections.emptyList());

    List<NoteEntity> notes = noteService.getNotes();

    verify(mockNoteRepository, times(1)).findAll();
    assertThat(notes).isEmpty();
  }

  @DisplayName("should return a note with matching id")
  @Test
  void getNoteById() {
    final Long id = 2L;
    NoteEntity noteEntity = NoteEntity.builder().id(id).build();
    when(mockNoteRepository.findById(id)).thenReturn(Optional.of(noteEntity));

    NoteEntity note = noteService.getNoteById(id);

    verify(mockNoteRepository, times(1)).findById(id);
    assertThat(note.getId()).isEqualTo(id);
  }

  @DisplayName("should throw itemNotFound exception when no note with matching id found")
  @Test
  void getNoteById_throwsNotFoundException() {
    final Long id = 99L;
    final String errorMessage = String.format("Note with Id %d not found", id);
    ItemNotFoundException exception = new ItemNotFoundException(errorMessage);
    when(mockNoteRepository.findById(id)).thenThrow(exception);

    Throwable throwable = catchThrowable(() -> noteService.getNoteById(id));

    assertThat(throwable)
        .isInstanceOf(ItemNotFoundException.class)
        .hasMessage(errorMessage);
  }
}
