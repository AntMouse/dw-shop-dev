package com.example.DWShopProject.product.entity;

import com.example.DWShopProject.common.enums.ParentTypeEnum;
import com.example.DWShopProject.common.enums.ProductTypeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductTypeMgmt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ProductTypeEnum productType;

    @Enumerated(EnumType.STRING)
    private ParentTypeEnum parentType;

    public ProductTypeMgmt(ProductTypeEnum productType, ParentTypeEnum parentType) {
        this.productType = productType;
        this.parentType = parentType;
    }
}
