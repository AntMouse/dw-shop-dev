package com.example.dw.shop.option.mapper;

import com.example.dw.shop.option.dto.OptionGroupRequestDto;
import com.example.dw.shop.option.dto.OptionGroupResponseDto;
import com.example.dw.shop.option.dto.OptionGroupListDto;
import com.example.dw.shop.option.dto.OptionGroupUpdateDto;
import com.example.dw.shop.option.entity.OptionGroup;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OptionGroupMapper {

    // 엔티티를 dto로 변경.
    OptionGroupListDto toListDto(OptionGroup optionGroup);
    OptionGroupResponseDto toResponseDto(OptionGroup optionGroup);

    // dto를 엔티티로 변경.
    OptionGroup toRequestEntity(OptionGroupRequestDto dto);

    // 엔티티 값 변경(업데이트)
    void updateEntityFromDto(OptionGroupUpdateDto dto, @MappingTarget OptionGroup optionGroup);
}