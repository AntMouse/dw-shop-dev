package com.example.dw.shop.product.value;

import com.example.dw.shop.product.entity.ProductOption;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Embeddable
public class Price {
    private BigDecimal basePrice;    // 정가 (Original Price)
    private BigDecimal optionPrice;  // 옵션 추가 금액
    private BigDecimal finalPrice;   // 옵션 반영 후 최종 가격

    protected Price() {}

    public Price(BigDecimal basePrice, List<ProductOption> selectedOptions, OptionPriceCalculator optionPriceCalculator) {
        this.basePrice = basePrice != null ? basePrice : BigDecimal.ZERO;
        this.optionPrice = optionPriceCalculator.calculateTotalOptionPrice(selectedOptions);

        // 1️⃣ 기본 가격 + 옵션 추가 가격
        this.finalPrice = this.basePrice.add(this.optionPrice);
    }
}
