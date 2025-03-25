package com.example.dw.shop.product.value;

import java.math.BigDecimal;

public class PriceValidator {
    public static void validate(BigDecimal basePrice, BigDecimal tax, BigDecimal discount, BigDecimal discountRate) {
        if (basePrice == null || basePrice.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("정가는 0 이상이어야 합니다.");
        }
        if (tax != null && tax.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("세금은 0 이상이어야 합니다.");
        }
        if (discount != null && discount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("할인 금액은 0 이상이어야 합니다.");
        }
        if (discountRate != null && (discountRate.compareTo(BigDecimal.ZERO) < 0 || discountRate.compareTo(BigDecimal.valueOf(100)) > 0)) {
            throw new IllegalArgumentException("할인율은 0~100% 사이여야 합니다.");
        }
    }
}