package com.harluss.notes.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteResponseDto {

  private Long id;
  private String title;
  private String details;
  private Boolean isPinned;
  private Date createdAt;
  private Date updatedAt;
}
