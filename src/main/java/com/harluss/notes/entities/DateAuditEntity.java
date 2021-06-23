package com.harluss.notes.entities;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class DateAuditEntity implements Serializable {
  @CreatedDate
  @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "timestamptz")
  private Date createdAt;

  @LastModifiedDate
  @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
  private Date updatedAt;
}
