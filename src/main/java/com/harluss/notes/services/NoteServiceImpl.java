package com.harluss.notes.services;

import com.harluss.notes.dtos.NoteUpdateRequestDto;
import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.exceptions.NotFoundException;
import com.harluss.notes.mappers.NoteMapper;
import com.harluss.notes.repositories.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {

  private final NoteRepository noteRepository;
  private final NoteMapper mapper;

  public NoteServiceImpl(final NoteRepository noteRepository, NoteMapper mapper) {
    this.noteRepository = noteRepository;
    this.mapper = mapper;
  }

  @Override
  public List<NoteEntity> getAll() {
    return noteRepository.findAll();
  }

  @Override
  public NoteEntity getById(long id) {
    return noteRepository
        .findById(id)
        .orElseThrow(() -> new NotFoundException(String.format("Note with Id %d not found", id)));
  }

  @Override
  public NoteEntity save(NoteEntity noteEntity) {
    return noteRepository.save(noteEntity);
  }

  @Override
  public NoteEntity update(NoteUpdateRequestDto noteUpdateRequest, long id) {
    NoteEntity noteToBeUpdated = noteRepository
        .findById(id)
        .orElseThrow(() -> new NotFoundException(String.format("Note with Id %d not found", id)));

    mapper.entityUpdate(noteToBeUpdated, noteUpdateRequest);

    return noteRepository.save(noteToBeUpdated);
  }
}
