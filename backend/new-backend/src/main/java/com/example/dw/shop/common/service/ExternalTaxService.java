package com.example.dw.shop.common.service;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class ExternalTaxService implements TaxService {
    private static final BigDecimal DEFAULT_VAT_RATE = BigDecimal.valueOf(0.10); // 임시 부가세 10%
    private static final int SCALE = 2; // 소수점 2자리까지 유지

    @Override
    public BigDecimal calculateTax(BigDecimal salePrice) {
        if (salePrice == null || salePrice.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO; // 가격이 0 이하일 경우 세금 없음
        }

        // 1️⃣ 세금 계산 (10% 부가세)
        BigDecimal tax = salePrice.multiply(DEFAULT_VAT_RATE);

        // 2️⃣ 소수점 2자리까지 유지 & 반올림 적용 (HALF_UP)
        return tax.setScale(SCALE, RoundingMode.HALF_UP);
    }
}