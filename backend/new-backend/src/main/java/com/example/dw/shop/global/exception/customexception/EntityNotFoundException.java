package com.example.dw.shop.global.exception.customexception;

import com.example.dw.shop.global.exception.errorcode.BaseErrorCode;

/**
 * ✅ 공통 엔티티 조회 실패 예외 처리 클래스
 * db에 데이터가 존재하지 않을 때 발생
 */
public class EntityNotFoundException extends CustomException {
    public EntityNotFoundException(BaseErrorCode errorCode) {
        super(errorCode);
    }

    public EntityNotFoundException(BaseErrorCode errorCode, String detailMessage) {
        super(errorCode, detailMessage);
    }
}