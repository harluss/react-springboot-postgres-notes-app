package com.harluss.notes.services;

import com.harluss.notes.constants.NoteApiConstants;
import com.harluss.notes.dtos.NoteUpdateRequestDto;
import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.exceptions.NotFoundException;
import com.harluss.notes.mappers.NoteMapper;
import com.harluss.notes.repositories.NoteRepository;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@CacheConfig(cacheNames = "notes")
public class NoteServiceImpl implements NoteService {

  private final NoteRepository noteRepository;
  private final NoteMapper mapper;

  public NoteServiceImpl(final NoteRepository noteRepository, NoteMapper mapper) {
    this.noteRepository = noteRepository;
    this.mapper = mapper;
  }

  @Override
  @Cacheable(key = "#root.methodName")
  @Transactional(readOnly = true)
  public List<NoteEntity> getAll() {
    return noteRepository.findAll();
  }

  @Override
  @Cacheable(key = "#id")
  @Transactional(readOnly = true)
  public NoteEntity getById(long id) {
    return noteRepository
        .findById(id)
        .orElseThrow(() -> new NotFoundException(String.format(NoteApiConstants.NOTE_NOT_FOUND, id)));
  }

  @Override
  @CacheEvict(key = "'getAll'")
  @CachePut(key = "#result.id")
  @Transactional
  public NoteEntity save(NoteEntity noteEntity) {
    return noteRepository.save(noteEntity);
  }

  @Override
  @CacheEvict(key = "'getAll'")
  @CachePut(key = "#result.id")
  @Transactional
  public NoteEntity update(NoteUpdateRequestDto noteUpdateRequest, long id) {
    NoteEntity noteToBeUpdated = noteRepository
        .findById(id)
        .orElseThrow(() -> new NotFoundException(String.format(NoteApiConstants.NOTE_NOT_FOUND, id)));

    mapper.entityUpdate(noteToBeUpdated, noteUpdateRequest);

    return noteRepository.save(noteToBeUpdated);
  }

  @Override
  @CacheEvict(allEntries = true)
  @Transactional
  public void delete(long id) {
    try {
      noteRepository.deleteById(id);
    } catch (EmptyResultDataAccessException exception) {
      throw new NotFoundException(String.format(NoteApiConstants.NOTE_NOT_FOUND, id));
    }
  }
}
