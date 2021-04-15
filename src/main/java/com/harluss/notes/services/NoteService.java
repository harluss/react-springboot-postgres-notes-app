package com.harluss.notes.services;

import com.harluss.notes.entities.NoteEntity;

import java.util.List;
import java.util.Optional;

public interface NoteService {

  List<NoteEntity> getNotes();
  NoteEntity getNoteById(Long id);
}
