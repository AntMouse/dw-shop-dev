package com.example.dw.shop.option.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OptionName {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String optionName;  // 옵션 이름 (예: "S", "블랙")

    @Column(length = 255)
    private String description; // 옵션 설명

    @Builder
    public OptionName(String optionName, String description) {
        this.optionName = optionName;
        this.description = description;
    }

    // ✅ 옵션 이름 업데이트 메서드 추가
    public void updateOptionName(String optionName, String description) {
        this.optionName = optionName;
        this.description = description;
    }
}
