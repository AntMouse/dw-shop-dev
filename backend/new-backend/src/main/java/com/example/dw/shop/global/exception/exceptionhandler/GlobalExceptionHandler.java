package com.example.dw.shop.global.exception.exceptionhandler;

import com.example.dw.shop.common.response.ApiResponse;
import com.example.dw.shop.global.exception.customexception.CustomException;
import com.example.dw.shop.global.exception.customexception.ValidationException;
import com.example.dw.shop.global.exception.errorcode.CommonErrorCode;
import com.example.dw.shop.global.exception.helper.ExceptionResponseHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// 전역 예외 처리 핸들러
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 기타 예외 처리(서버 내부 오류로 처리) 및 따로 처리를 지정하지 않은 예외 처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception e) {
        log.error("예기치 않은 예외 발생: ", e);
        return ResponseEntity
                .internalServerError()
                .body(ApiResponse.error(CommonErrorCode.INTERNAL_SERVER_ERROR.getMessage()));
    }

    // 커스텀 예외 처리
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse<Void>> handleCustomException(CustomException e) {
        return ExceptionResponseHelper.buildErrorResponse(e.getErrorCode(), e.getErrorCode().getMessage());
    }

    // ValidationException 직접 던진 경우 처리
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationException(ValidationException e) {
        return ExceptionResponseHelper.buildErrorResponse(e.getErrorCode(), e.getErrorCode().getMessage());
    }

    // 검증 관련 예외 처리 (Spring `@Valid` 및 `@Validated` 예외 처리)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationErrors(MethodArgumentNotValidException e) {
        log.warn("검증 실패: {}", e.getMessage(), e);
        return ExceptionResponseHelper.buildFieldErrorResponse(e);
    }

    // `BindException` 예외 처리 (폼 데이터 검증 실패 시)
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ApiResponse<Void>> handleBindException(BindException e) {
        log.warn("바인딩 실패: {}", e.getMessage(), e);
        return ExceptionResponseHelper.buildFieldErrorResponse(e);
    }
}