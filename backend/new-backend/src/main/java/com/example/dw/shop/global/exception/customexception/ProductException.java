package com.example.dw.shop.global.exception.customexception;

import com.example.dw.shop.global.exception.errorcode.BaseErrorCode;

public class ProductException extends CustomException {

    // ✅ 기본 생성자 (에러 코드만 받음)
    public ProductException(BaseErrorCode errorCode) {
        super(errorCode);
    }

    // ✅ 상세 메시지를 포함하는 생성자 추가
    public ProductException(BaseErrorCode errorCode, String detailMessage) {
        super(errorCode, detailMessage);
    }
}