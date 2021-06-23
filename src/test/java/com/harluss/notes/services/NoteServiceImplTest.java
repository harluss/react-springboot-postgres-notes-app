package com.harluss.notes.services;

import com.harluss.notes.constants.NoteApiConstants;
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
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.*;

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
    final List<NoteEntity> noteEntities = Arrays.asList(NoteEntity.builder().build());
    when(mockNoteRepository.findAll()).thenReturn(noteEntities);

    List<NoteEntity> notes = noteService.getAll();

    assertThat(notes)
        .isNotEmpty()
        .hasAtLeastOneElementOfType(NoteEntity.class);
  }

  @DisplayName("should return empty list when no notes exist")
  @Test
  void getAll_empty() {
    when(mockNoteRepository.findAll()).thenReturn(Collections.emptyList());

    List<NoteEntity> notes = noteService.getAll();

    assertThat(notes).isEmpty();
  }

  @DisplayName("should return a note with given id")
  @Test
  void getById() {
    final UUID id = UUID.randomUUID();
    final NoteEntity noteEntity = NoteEntity.builder().build();
    when(mockNoteRepository.findById(id)).thenReturn(Optional.of(noteEntity));

    NoteEntity note = noteService.getById(id);

    assertThat(note).isNotNull();
  }

  @DisplayName("should throw NotFound exception when note not found")
  @Test
  void getById_throwsNotFoundException() {
    final UUID id = UUID.randomUUID();
    final String errorMessage = String.format(NoteApiConstants.NOTE_NOT_FOUND, id);

    Throwable throwable = catchThrowable(() -> noteService.getById(id));

    assertThat(throwable)
        .isInstanceOf(NotFoundException.class)
        .hasMessage(errorMessage);
  }

  @DisplayName("should save and return new note")
  @Test
  void save() {
    final UUID id = UUID.randomUUID();
    final NoteEntity noteEntity = NoteEntity.builder().build();
    final NoteEntity savedNoteEntity = NoteEntity.builder().id(id).build();
    when(mockNoteRepository.save(noteEntity)).thenReturn(savedNoteEntity);

    NoteEntity savedNote = noteService.save(noteEntity);

    assertThat(savedNote).isEqualTo(savedNoteEntity);
  }

  @DisplayName("should update and return an existing note with given id")
  @Test
  void update() {
    final UUID id = UUID.randomUUID();
    final String title = "some title";
    final NoteEntity noteEntity = NoteEntity.builder().id(id).build();
    final NoteEntity updatedNoteEntity = NoteEntity.builder().title(title).build();
    when(mockNoteRepository.findById(id)).thenReturn(Optional.of(noteEntity));
    doNothing().when(mockMapper).entityUpdate(any(),any());
    when(mockNoteRepository.save(noteEntity)).thenReturn(updatedNoteEntity);

    NoteEntity updatedNote = noteService.update(any(), id);

    assertThat(updatedNote.getTitle()).isEqualTo(title);
  }

  @DisplayName("should throw NotFound exception when note to be updated not found")
  @Test
  void update_throwsNotFoundException() {
    final UUID id = UUID.randomUUID();
    final String errorMessage = String.format(NoteApiConstants.NOTE_NOT_FOUND, id);

    Throwable throwable = catchThrowable(() -> noteService.update(any(), id));

    assertThat(throwable)
        .isInstanceOf(NotFoundException.class)
        .hasMessage(errorMessage);
  }

  @DisplayName("should delete a note with given id")
  @Test
  void delete() {
    final UUID id = UUID.randomUUID();

    noteService.delete(id);

    verify(mockNoteRepository, times(1)).deleteById(id);
  }

  @DisplayName("should throw NotFound exception when note to be deleted not found")
  @Test
  void delete_throwsNotFoundException() {
    final UUID id = UUID.randomUUID();
    final String errorMessage = String.format(NoteApiConstants.NOTE_NOT_FOUND, id);
    doThrow(new EmptyResultDataAccessException('x')).when(mockNoteRepository).deleteById(id);

    Throwable throwable = catchThrowable(() -> noteService.delete(id));

    assertThat(throwable)
        .isInstanceOf(NotFoundException.class)
        .hasMessage(errorMessage);
  }
}
