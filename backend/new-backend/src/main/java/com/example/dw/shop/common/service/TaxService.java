package com.example.dw.shop.common.service;

import java.math.BigDecimal;

public interface TaxService {
    BigDecimal calculateTax(BigDecimal salePrice);
}