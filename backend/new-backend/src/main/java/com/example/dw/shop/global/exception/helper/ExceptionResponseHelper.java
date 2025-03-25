package com.example.dw.shop.global.exception.helper;

import com.example.dw.shop.common.response.ApiResponse;
import com.example.dw.shop.global.exception.errorcode.BaseErrorCode;
import com.example.dw.shop.global.exception.errorcode.CommonErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;

import java.util.List;

// 예외 응답 공통 처리 헬퍼 클래스
public class ExceptionResponseHelper {

    // 공통 예외 응답 처리 메서드
    public static ResponseEntity<ApiResponse<Void>> buildErrorResponse(BaseErrorCode errorCode, String message) {
        return ResponseEntity
                .status(errorCode.getStatus())
                .body(ApiResponse.error(message));
    }

    // 필드 검증 오류 응답 처리 메서드
    public static ResponseEntity<ApiResponse<Void>> buildFieldErrorResponse(BindException e) {
        List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        String errorMessage = fieldErrors.isEmpty()
                ? CommonErrorCode.VALIDATION_ERROR.getMessage()
                : fieldErrors.get(0).getDefaultMessage();

        return buildErrorResponse(CommonErrorCode.VALIDATION_ERROR, errorMessage);
    }
}
