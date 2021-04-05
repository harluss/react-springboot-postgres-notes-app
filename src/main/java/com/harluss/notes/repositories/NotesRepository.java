package com.harluss.notes.repositories;

import com.harluss.notes.entities.NoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotesRepository extends JpaRepository<NoteEntity, Long> {
}
