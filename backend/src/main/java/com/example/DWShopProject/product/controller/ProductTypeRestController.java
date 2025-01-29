package com.example.DWShopProject.product.controller;

import com.example.DWShopProject.common.exception.ResourceNotFoundException;
import com.example.DWShopProject.product.entity.ProductTypeMgmt;
import com.example.DWShopProject.common.enums.ParentTypeEnum;
import com.example.DWShopProject.product.service.ProductTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product-types")
@RequiredArgsConstructor
public class ProductTypeRestController {
    private final ProductTypeService productTypeService;

    @GetMapping
    public List<ProductTypeMgmt> getAllProductTypes() {
        return productTypeService.getAllProductTypes();
    }

    @GetMapping("/{productType}")
    public List<ProductTypeMgmt> getProductTypesByParent(@PathVariable String productType) {
        try {
            ParentTypeEnum parentTypeEnum = ParentTypeEnum.valueOf(productType.toUpperCase());
            return productTypeService.getProductTypesByParent(parentTypeEnum);
        } catch (IllegalArgumentException e) {
            throw new ResourceNotFoundException("Invalid product type: " + productType);
        }
    }
}
