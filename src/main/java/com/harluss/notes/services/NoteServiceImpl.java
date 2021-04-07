package com.harluss.notes.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.harluss.notes.dtos.NoteResponse;
import com.harluss.notes.repositories.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

  private final NoteRepository noteRepository;

  private final ObjectMapper objectMapper;

  public NoteServiceImpl(final NoteRepository noteRepository, final ObjectMapper objectMapper) {
    this.noteRepository = noteRepository;
    this.objectMapper = objectMapper;
  }

  @Override
  public List<NoteResponse> getNotes() {
    return noteRepository.findAll()
        .stream()
        .map(noteEntity -> objectMapper.convertValue(noteEntity, NoteResponse.class))
        .collect(Collectors.toList());
  }
}
