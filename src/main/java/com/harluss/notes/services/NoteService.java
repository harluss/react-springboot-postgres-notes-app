package com.harluss.notes.services;

import com.harluss.notes.dtos.NoteUpdateRequestDto;
import com.harluss.notes.entities.NoteEntity;

import java.util.List;
import java.util.UUID;

public interface NoteService {

  List<NoteEntity> getAll();
  NoteEntity getById(UUID id);
  NoteEntity save(NoteEntity noteEntity);
  NoteEntity update(NoteUpdateRequestDto noteUpdateRequestDto, UUID id);
  void delete(UUID id);
}
