package com.harluss.notes.mappers;

import com.harluss.notes.dtos.NoteResponseDto;
import com.harluss.notes.entities.NoteEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

  List<NoteResponseDto> noteEntityListToResponseDtoList(List<NoteEntity> noteEntities);
}
