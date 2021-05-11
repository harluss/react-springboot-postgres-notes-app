package com.harluss.notes.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "notes")
public class NoteEntity extends DateAuditEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "title", nullable = false, length = 100)
  @Size(min = 1, max = 100)
  private String title;

  @Column(name = "details", nullable = false, columnDefinition = "text")
  private String details;

  @Column(name = "is_pinned", nullable = false)
  private Boolean isPinned;
}
