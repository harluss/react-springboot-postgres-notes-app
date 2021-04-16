package com.harluss.notes.services;

import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.exceptions.NotFoundException;
import com.harluss.notes.mappers.NoteMapper;
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

  @Mock
  private NoteMapper mockMapper;

  @InjectMocks
  private NoteServiceImpl noteService;

  @DisplayName("should return list of notes")
  @Test
  void getAll() {
    List<NoteEntity> noteEntities = Arrays.asList(NoteEntity.builder().build());
    when(mockNoteRepository.findAll()).thenReturn(noteEntities);

    List<NoteEntity> notes = noteService.getAll();

    verify(mockNoteRepository, times(1)).findAll();
    assertThat(notes)
        .isNotEmpty()
        .hasAtLeastOneElementOfType(NoteEntity.class);
  }

  @DisplayName("should return empty list when no notes found")
  @Test
  void getAll_empty() {
    when(mockNoteRepository.findAll()).thenReturn(Collections.emptyList());

    List<NoteEntity> notes = noteService.getAll();

    verify(mockNoteRepository, times(1)).findAll();
    assertThat(notes).isEmpty();
  }

  @DisplayName("should return a note with given id")
  @Test
  void getById() {
    final long id = 2L;
    NoteEntity noteEntity = NoteEntity.builder().id(id).build();
    when(mockNoteRepository.findById(id)).thenReturn(Optional.of(noteEntity));

    NoteEntity note = noteService.getById(id);

    verify(mockNoteRepository, times(1)).findById(id);
    assertThat(note.getId()).isEqualTo(id);
  }

  @DisplayName("should throw NotFound exception when no note with given id found")
  @Test
  void getById_throwsNotFoundException() {
    final long id = 99L;
    final String errorMessage = String.format("Note with Id %d not found", id);
    NotFoundException exception = new NotFoundException(errorMessage);
    when(mockNoteRepository.findById(id)).thenThrow(exception);

    Throwable throwable = catchThrowable(() -> noteService.getById(id));

    assertThat(throwable)
        .isInstanceOf(NotFoundException.class)
        .hasMessage(errorMessage);
  }

  @DisplayName("should save and return new note")
  @Test
  void save() {
    NoteEntity noteEntity = NoteEntity.builder().build();
    NoteEntity savedNoteEntity = NoteEntity.builder().id(2L).build();
    when(mockNoteRepository.save(noteEntity)).thenReturn(savedNoteEntity);

    NoteEntity savedNote = noteService.save(noteEntity);

    verify(mockNoteRepository, times(1)).save(noteEntity);
    assertThat(savedNote).isEqualTo(savedNoteEntity);
  }

  @DisplayName("should update and return an existing note with given id")
  @Test
  void update() {
    final long id = 2L;
    final String title = "some title";
    NoteEntity noteEntity = NoteEntity.builder().id(id).build();
    NoteEntity updatedNoteEntity = NoteEntity.builder().title(title).build();
    when(mockNoteRepository.findById(id)).thenReturn(Optional.of(noteEntity));
    doNothing().when(mockMapper).entityUpdate(any(),any());
    when(mockNoteRepository.save(noteEntity)).thenReturn(updatedNoteEntity);

    NoteEntity updatedNote = noteService.update(any(), id);

    verify(mockNoteRepository, times(1)).findById(id);
    verify(mockNoteRepository, times(1)).save(noteEntity);
    assertThat(updatedNote.getTitle()).isEqualTo(title);
  }

  @DisplayName("should thrown NotFound exception when no note with given id found")
  @Test
  void update_throwsNotFoundException() {
    final long id = 99L;
    final String errorMessage = String.format("Note with Id %d not found", id);
    NotFoundException exception = new NotFoundException(errorMessage);
    when(mockNoteRepository.findById(id)).thenThrow(exception);

    Throwable throwable = catchThrowable(() -> noteService.update(any(), id));

    assertThat(throwable)
        .isInstanceOf(NotFoundException.class)
        .hasMessage(errorMessage);
  }

  @DisplayName("should delete a note with given id")
  @Test
  void delete() {
    final long id = 2L;
    NoteEntity noteEntity = NoteEntity.builder().id(id).build();
    when(mockNoteRepository.findById(id)).thenReturn(Optional.ofNullable(noteEntity));

    noteService.delete(id);

    verify(mockNoteRepository, times(1)).findById(id);
    verify(mockNoteRepository, times(1)).deleteById(id);
  }

  @DisplayName("should throw NotFound exception when no note with given id found")
  @Test
  void delete_throwsNotFoundException() {
    final long id = 2L;
    final String errorMessage = String.format("Note with Id %d not found", id);
    NotFoundException exception = new NotFoundException(errorMessage);
    when(mockNoteRepository.findById(id)).thenThrow(exception);

    Throwable throwable = catchThrowable(() -> noteService.delete(id));

    assertThat(throwable)
        .isInstanceOf(NotFoundException.class)
        .hasMessage(errorMessage);
  }
}
