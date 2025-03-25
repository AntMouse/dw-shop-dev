package com.example.dw.shop.global.exception.customexception;

import com.example.dw.shop.global.exception.errorcode.BaseErrorCode;

/**
 * ✅ 검증 관련 예외 처리 클래스 (CustomException 상속)
 * 사용자의 입력값이 잘못되었을 때 발생
 */
public class ValidationException extends CustomException {
    public ValidationException(BaseErrorCode errorCode) {
        super(errorCode);
    }

    public ValidationException(BaseErrorCode errorCode, String detailMessage) {
        super(errorCode, detailMessage);
    }
}
