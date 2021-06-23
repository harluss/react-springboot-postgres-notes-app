package com.harluss.notes.entities;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "notes")
public class NoteEntity extends DateAuditEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  @Column(name = "title", nullable = false, columnDefinition = "text")
  private String title;

  @Column(name = "details", nullable = false, columnDefinition = "text")
  private String details;

  @Column(name = "is_pinned", nullable = false)
  private Boolean isPinned;
}
