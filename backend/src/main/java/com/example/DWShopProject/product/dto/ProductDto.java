package com.example.DWShopProject.product.dto;

import com.example.DWShopProject.common.enums.ProductTypeEnum;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class ProductDto {
    private Long id;
    private ProductTypeEnum productType;
    private String productName;
    private int price;
    private String explanation;
    private String imageUrl;
}