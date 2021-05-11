package com.harluss.notes.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteCreateRequestDto {

  @NotBlank
  @Size(min = 1, max = 100)
  private String title;
  @NotBlank
  private String details;
  @NotNull
  private Boolean isPinned;
}
