package com.harluss.notes.services;

import com.harluss.notes.dtos.NoteResponse;

import java.util.List;

public interface NoteService {

  List<NoteResponse> getNotes();
}
