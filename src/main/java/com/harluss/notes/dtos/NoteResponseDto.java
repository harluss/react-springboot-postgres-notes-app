package com.harluss.notes.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteResponseDto {

  private Long id;
  private String title;
  private String details;
  private Boolean isPinned;
  private ZonedDateTime createdAt;
  private ZonedDateTime updatedAt;
}
