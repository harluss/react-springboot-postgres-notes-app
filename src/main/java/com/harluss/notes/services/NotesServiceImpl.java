package com.harluss.notes.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.harluss.notes.dtos.NoteResponse;
import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.repositories.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotesServiceImpl implements NotesService {

  @Autowired
  private NotesRepository notesRepository;

  @Autowired
  private ObjectMapper objectMapper;

  @Override
  public List<NoteResponse> getNotes() {

    List<NoteEntity> notes = notesRepository.findAll();

    if (notes.isEmpty()) {
      System.out.println("NO DATA FOUND");
    }

    return notes
        .stream()
        .map(noteEntity -> objectMapper.convertValue(noteEntity, NoteResponse.class))
        .collect(Collectors.toList());
  }
}
