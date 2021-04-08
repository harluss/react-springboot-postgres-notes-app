package com.harluss.notes.services;

import com.harluss.notes.entities.NoteEntity;

import java.util.List;

public interface NoteService {

  List<NoteEntity> getNotes();
}
