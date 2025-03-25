package com.example.dw.shop.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductUpdateDto {
    private String productName;
    private BigDecimal price;
    private String explanation;
    private String imageUrl;
    private Integer stock; // `null`이면 기존 값 유지
}
