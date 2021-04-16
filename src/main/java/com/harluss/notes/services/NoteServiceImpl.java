package com.harluss.notes.services;

import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.exceptions.NotFoundException;
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
  public List<NoteEntity> getAll() {
    return noteRepository.findAll();
  }

  @Override
  public NoteEntity getById(Long id) {
    return noteRepository
        .findById(id)
        .orElseThrow(() -> new NotFoundException(String.format("Note with Id %d not found", id)));
  }

  @Override
  public NoteEntity save(NoteEntity noteEntity) {
    return noteRepository.save(noteEntity);
  }
}
