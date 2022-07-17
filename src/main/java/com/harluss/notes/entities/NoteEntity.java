package com.harluss.notes.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "notes")
public class NoteEntity implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  @Column(name = "title", nullable = false, columnDefinition = "text")
  private String title;

  @Column(name = "details", nullable = false, columnDefinition = "text")
  private String details;

  @Column(name = "is_pinned", nullable = false)
  private Boolean isPinned;

  @CreatedDate
  @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "timestamptz")
  private Date createdAt;

  @LastModifiedDate
  @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
  private Date updatedAt;
}
