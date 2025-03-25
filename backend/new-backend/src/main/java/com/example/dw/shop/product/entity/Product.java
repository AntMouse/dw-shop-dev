package com.example.dw.shop.product.entity;

import com.example.dw.shop.product.dto.ProductUpdateDto;
import com.example.dw.shop.product.value.Price;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String productName;

    @Embedded
    private Price price;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    private String imageUrl;

    @Column(nullable = false)
    private int stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false) // 상품 유형과 연결
    private ProductCategory category;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // ✅ 상품 옵션 리스트
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ProductOption> options = new ArrayList<>();

    /* Price, ProductOption 클래스는 제작 중에 있으므로 아래 코드는 나중에 수정한다. 일단 지금은 주석 처리.
    @Builder
    public Product(String productName, Price price, String explanation, String imageUrl, int stock) {
        this.productName = productName;
        this.price = price;
        this.explanation = explanation;
        this.imageUrl = imageUrl;
        this.stock = stock;
    }

    @Builder(builderMethodName = "withId")
    public Product(Long id, String productName, Price price, String explanation, String imageUrl, int stock, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.productName = productName;
        this.price = price;
        this.explanation = explanation;
        this.imageUrl = imageUrl;
        this.stock = stock;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void updateProductInfo(ProductUpdateDto dto, List<ProductOption> selectedOptions) {
        this.productName = dto.getProductName();
        this.explanation = dto.getExplanation();
        this.imageUrl = dto.getImageUrl();
        this.stock = dto.getStock();
    }
    */
}