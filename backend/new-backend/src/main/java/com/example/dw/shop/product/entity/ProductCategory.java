package com.example.dw.shop.product.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String categoryName;  // 상품 유형명 (예: "의류", "전자제품", "생활용품")

    @Column(length = 255)
    private String description; // 상품 유형 설명

    @Builder
    public ProductCategory(String categoryName, String description) {
        this.categoryName = categoryName;
        this.description = description;
    }
}