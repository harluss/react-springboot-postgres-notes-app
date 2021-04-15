package com.harluss.notes.services;

import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.exceptions.ItemNotFoundException;
import com.harluss.notes.repositories.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {

  private final NoteRepository noteRepository;

  public NoteServiceImpl(final NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  @Override
  public List<NoteEntity> getNotes() {
    return noteRepository.findAll();
  }

  @Override
  public NoteEntity getNoteById(Long id) {
    return noteRepository
        .findById(id)
        .orElseThrow(() -> new ItemNotFoundException(String.format("Note with Id %d not found", id)));
  }
}
