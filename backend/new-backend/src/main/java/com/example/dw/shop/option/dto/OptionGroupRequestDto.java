package com.example.dw.shop.option.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OptionGroupRequestDto {

    @NotBlank(message = "옵션 그룹명은 필수 입력값입니다.") // ✅ 빈 값 방지
    @Size(min = 2, max = 50, message = "옵션 그룹명은 2자 이상 50자 이하로 입력해야 합니다.") // ✅ 길이 제한
    private String groupName;

    @Size(max = 255, message = "설명은 최대 255자까지 입력할 수 있습니다.") // ✅ 설명 길이 제한
    private String description;

    @Builder
    public OptionGroupRequestDto(String groupName, String description) {
        this.groupName = groupName;
        this.description = description;
    }
}