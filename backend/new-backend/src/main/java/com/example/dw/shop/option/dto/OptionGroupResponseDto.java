package com.example.dw.shop.option.dto;

import com.example.dw.shop.option.entity.OptionGroup;
import lombok.Getter;

@Getter
public class OptionGroupResponseDto {
    // 옵션 그룹을 상세 조회할 때 사용.
    // db에서 가져온 엔티티를 dto로 변환해서 반환
    private final Long id;
    private final String groupName;
    private final String description;

    public OptionGroupResponseDto(Long id, String groupName, String description) {
        this.id = id;
        this.groupName = groupName;
        this.description = description;
    }
}