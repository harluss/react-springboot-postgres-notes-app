package com.harluss.notes.mappers;

import com.harluss.notes.dtos.NoteCreateRequestDto;
import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.dtos.NoteUpdateRequestDto;
import com.harluss.notes.entities.NoteEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NoteMapper {

  NoteResponseDto entityToResponseDto(NoteEntity noteEntity);

  List<NoteResponseDto> entityListToResponseDtoList(List<NoteEntity> noteEntities);

  NoteEntity createRequestDtoToEntity(NoteCreateRequestDto noteRequest);

  void entityUpdate(@MappingTarget NoteEntity noteEntity, NoteUpdateRequestDto noteUpdateRequestDto);
}
