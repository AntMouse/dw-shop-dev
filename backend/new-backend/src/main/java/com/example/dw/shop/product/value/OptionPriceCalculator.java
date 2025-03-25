package com.example.dw.shop.product.value;

import com.example.dw.shop.product.entity.ProductOption;
import java.math.BigDecimal;
import java.util.List;

public class OptionPriceCalculator {

    public BigDecimal calculateTotalOptionPrice(List<ProductOption> selectedOptions) {
        if (selectedOptions == null || selectedOptions.isEmpty()) {
            return BigDecimal.ZERO;
        }

        return selectedOptions.stream()
                .map(ProductOption::getOptionPrice)  // 옵션 가격만 가져오기
                .reduce(BigDecimal.ZERO, BigDecimal::add); // 총합 계산
    }
}