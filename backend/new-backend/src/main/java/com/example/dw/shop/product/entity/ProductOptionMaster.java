package com.example.dw.shop.product.entity;

import com.example.dw.shop.option.entity.OptionGroup;
import com.example.dw.shop.option.entity.OptionName;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductOptionMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_group_id", nullable = false)
    private OptionGroup optionGroup; // 옵션 그룹 (예: "사이즈", "색상")

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_name_id", nullable = false)
    private OptionName optionName; // 옵션 이름 (예: "M", "블랙")

    @Column(length = 255)
    private String description; // 옵션 설명

    public ProductOptionMaster(OptionGroup optionGroup, OptionName optionName, String description) {
        this.optionGroup = optionGroup;
        this.optionName = optionName;
        this.description = description;
    }
}