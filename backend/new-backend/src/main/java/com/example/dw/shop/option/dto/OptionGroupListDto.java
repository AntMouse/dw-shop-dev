package com.example.dw.shop.option.dto;

import com.example.dw.shop.option.entity.OptionGroup;
import lombok.Getter;

@Getter
public class OptionGroupListDto {
    // 옵션 그룹 목록 조회할 때 사용. 간단한 정보만 사용한다.
    private final Long id;
    private final String groupName;

    public OptionGroupListDto(Long id, String groupName) {
        this.id = id;
        this.groupName = groupName;
    }
}