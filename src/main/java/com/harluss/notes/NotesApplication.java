package com.harluss.notes;

import com.harluss.notes.entities.NoteEntity;
import com.harluss.notes.repositories.NoteRepository;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@OpenAPIDefinition(info = @Info(title = "Some Notes", description = "Some Notes API", version = "0.0.1"))
@SpringBootApplication
public class NotesApplication {

  public static void main(String[] args) {
    SpringApplication.run(NotesApplication.class, args);
  }

  @Bean
  CommandLineRunner commandLineRunner(NoteRepository noteRepository) {
    return args -> {
      NoteEntity note1 = NoteEntity.builder().title("random note").details("nothing worth mentioning").build();
      NoteEntity note2 = NoteEntity.builder().title("another random note").details("still nothing to see here").build();
      NoteEntity note3 = NoteEntity.builder().title("not so random note").details("yet still nothing to see here, keep walking").build();

      noteRepository.saveAll(Arrays.asList(note1, note2, note3));
    };
  }
}
