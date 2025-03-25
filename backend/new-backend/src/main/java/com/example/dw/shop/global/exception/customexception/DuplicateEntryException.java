package com.example.dw.shop.global.exception.customexception;

import com.example.dw.shop.global.exception.errorcode.BaseErrorCode;

/**
 * ✅ 중복된 데이터 입력 시 발생하는 예외
 */
public class DuplicateEntryException extends CustomException {
    public DuplicateEntryException(BaseErrorCode errorCode) {
        super(errorCode);
    }

    public DuplicateEntryException(BaseErrorCode errorCode, String detailMessage) {
        super(errorCode, detailMessage);
    }
}
