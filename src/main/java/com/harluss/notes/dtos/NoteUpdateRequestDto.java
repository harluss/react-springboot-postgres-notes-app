package com.harluss.notes.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteUpdateRequestDto {

  @NotBlank
  private String title;
  @NotBlank
  private String details;
}
