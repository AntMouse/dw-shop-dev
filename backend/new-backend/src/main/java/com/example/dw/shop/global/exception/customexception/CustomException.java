package com.example.dw.shop.global.exception.customexception;

import com.example.dw.shop.global.exception.errorcode.BaseErrorCode;
import lombok.Getter;

/**
 * ✅ 최상위 커스텀 예외 클래스
 */
@Getter
public class CustomException extends RuntimeException {
    private final BaseErrorCode errorCode;
    private final String detailMessage;

    public CustomException(BaseErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.detailMessage = errorCode.getMessage(); // 기본 메시지
    }

    public CustomException(BaseErrorCode errorCode, String detailMessage) {
        super(detailMessage);
        this.errorCode = errorCode;
        this.detailMessage = detailMessage; // 사용자 지정 메시지
    }
}