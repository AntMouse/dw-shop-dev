package com.example.dw.shop.product.value;

import java.math.BigDecimal;

public class DiscountPriceCalculator {

    // 최종 할인 적용된 가격 계산 메서드
    public BigDecimal calculateDiscountedPrice(BigDecimal basePrice, BigDecimal fixedDiscount, BigDecimal percentageDiscount, DiscountOrder discountOrder) {
        // 1️⃣ 할인값이 null이면 기본값(0)으로 설정
        fixedDiscount = fixedDiscount != null ? fixedDiscount : BigDecimal.ZERO;
        percentageDiscount = percentageDiscount != null ? percentageDiscount : BigDecimal.ZERO;

        // 2️⃣ 할인율과 고정 할인이 모두 0이면 원가 그대로 반환
        if (fixedDiscount.compareTo(BigDecimal.ZERO) <= 0 && percentageDiscount.compareTo(BigDecimal.ZERO) <= 0) {
            return basePrice;
        }

        // 3️⃣ 할인 적용 (분리된 메서드 사용)
        return applyDiscount(basePrice, fixedDiscount, percentageDiscount, discountOrder);
    }

    // 할인 적용 순서를 정하는 메서드
    private BigDecimal applyDiscount(BigDecimal basePrice, BigDecimal fixedDiscount, BigDecimal percentageDiscount, DiscountOrder discountOrder) {
        BigDecimal discountedPrice = basePrice;

        if (discountOrder == DiscountOrder.FIXED_FIRST) {
            discountedPrice = applyFixedDiscount(discountedPrice, fixedDiscount);
            discountedPrice = applyPercentageDiscount(discountedPrice, percentageDiscount);
        } else {
            discountedPrice = applyPercentageDiscount(discountedPrice, percentageDiscount);
            discountedPrice = applyFixedDiscount(discountedPrice, fixedDiscount);
        }

        // 4️⃣ 최종 가격이 0 이하가 되지 않도록 보정
        return discountedPrice.max(BigDecimal.ZERO);
    }

    // 고정 금액 할인 적용 메서드
    private BigDecimal applyFixedDiscount(BigDecimal price, BigDecimal fixedDiscount) {
        return price.subtract(fixedDiscount);
    }

    // 할인율 적용 메서드
    private BigDecimal applyPercentageDiscount(BigDecimal price, BigDecimal percentageDiscount) {
        BigDecimal discountAmount = price.multiply(percentageDiscount).divide(BigDecimal.valueOf(100));
        return price.subtract(discountAmount);
    }
}