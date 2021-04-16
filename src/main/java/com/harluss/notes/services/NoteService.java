package com.harluss.notes.services;

import com.harluss.notes.dtos.NoteUpdateRequestDto;
import com.harluss.notes.entities.NoteEntity;

import java.util.List;

public interface NoteService {

  List<NoteEntity> getAll();
  NoteEntity getById(long id);
  NoteEntity save(NoteEntity noteEntity);
  NoteEntity update(NoteUpdateRequestDto noteUpdateRequestDto, long id);
}
