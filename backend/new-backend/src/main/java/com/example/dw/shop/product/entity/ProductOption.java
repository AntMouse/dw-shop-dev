package com.example.dw.shop.product.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ 상품과 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // ✅ 옵션 마스터 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_option_master_id", nullable = false)
    private ProductOptionMaster productOptionMaster;

    @Column(nullable = false)
    private BigDecimal optionPrice;  // 추가 가격

    public ProductOption(Product product, ProductOptionMaster productOptionMaster, BigDecimal optionPrice) {
        this.product = product;
        this.productOptionMaster = productOptionMaster;
        this.optionPrice = optionPrice != null ? optionPrice : BigDecimal.ZERO;
    }
}