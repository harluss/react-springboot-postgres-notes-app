package com.harluss.notes.mappers;

import com.harluss.notes.dtos.NoteRequestDto;
import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.entities.NoteEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoteMapper {

  NoteResponseDto entityToResponseDto(NoteEntity noteEntity);

  List<NoteResponseDto> entityListToResponseDtoList(List<NoteEntity> noteEntities);

  @Mapping(target = "id", ignore = true)
  NoteEntity requestDtoToEntity(NoteRequestDto noteRequest);
}
