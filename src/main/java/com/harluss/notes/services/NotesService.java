package com.harluss.notes.services;

import com.harluss.notes.dtos.NoteResponse;
import org.springframework.stereotype.Service;

import java.util.List;

public interface NotesService {

  List<NoteResponse> getNotes();
}
