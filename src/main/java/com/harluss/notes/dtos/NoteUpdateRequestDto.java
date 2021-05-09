package com.harluss.notes.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteUpdateRequestDto {

  @NotBlank
  private String title;
  @NotBlank
  private String details;
  @NotNull
  private Boolean isPinned;
}
