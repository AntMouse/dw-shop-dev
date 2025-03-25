package com.example.dw.shop.global.validator;

import com.example.dw.shop.global.exception.customexception.CustomException;
import com.example.dw.shop.global.exception.customexception.ValidationException;
import com.example.dw.shop.global.exception.errorcode.BaseErrorCode;
import com.example.dw.shop.global.exception.errorcode.CommonErrorCode;
import org.springframework.util.StringUtils;

import java.util.function.BiFunction;

/**
 * ✅ 공통 검증 유틸리티 클래스
 */
public class FieldValidationUtil {

    /**
     * ✅ 필수 입력값 검증 (사용자가 원하는 예외를 지정 가능)
     */
    public static void requireNonEmpty(
            String value,
            String fieldName,
            BaseErrorCode errorCode,
            BiFunction<BaseErrorCode, String, ? extends CustomException> exceptionSupplier
    ) {
        if (!StringUtils.hasText(value)) {
            String errorMessage = fieldName + "은(는) 필수 입력값입니다.";
            throw exceptionSupplier.apply(errorCode, errorMessage);
        }
    }

    /**
     * ✅ 필수 입력값 검증 (기본적으로 `ValidationException`을 던짐)
     */
    public static void requireNonEmpty(String value, String fieldName) {
        requireNonEmpty(value, fieldName, CommonErrorCode.VALIDATION_ERROR, ValidationException::new);
    }

    /**
     * ✅ 최소 길이 검증 (사용자가 원하는 예외를 지정 가능)
     */
    public static void requireMinLength(
            String value,
            int minLength,
            String fieldName,
            BaseErrorCode errorCode,
            BiFunction<BaseErrorCode, String, ? extends CustomException> exceptionSupplier
    ) {
        if (value.length() < minLength) {
            String errorMessage = fieldName + "은(는) 최소 " + minLength + "자 이상이어야 합니다.";
            throw exceptionSupplier.apply(errorCode, errorMessage);
        }
    }

    /**
     * ✅ 최소 길이 검증 (기본적으로 `ValidationException`을 던짐)
     */
    public static void requireMinLength(String value, int minLength, String fieldName) {
        requireMinLength(value, minLength, fieldName, CommonErrorCode.VALIDATION_ERROR, ValidationException::new);
    }

    /**
     * ✅ 최대 길이 검증 (사용자가 원하는 예외를 지정 가능)
     */
    public static void requireMaxLength(
            String value,
            int maxLength,
            String fieldName,
            BaseErrorCode errorCode,
            BiFunction<BaseErrorCode, String, ? extends CustomException> exceptionSupplier
    ) {
        if (value.length() > maxLength) {
            String errorMessage = fieldName + "은(는) 최대 " + maxLength + "자까지 입력할 수 있습니다.";
            throw exceptionSupplier.apply(errorCode, errorMessage);
        }
    }

    /**
     * ✅ 최대 길이 검증 (기본적으로 `ValidationException`을 던짐)
     */
    public static void requireMaxLength(String value, int maxLength, String fieldName) {
        requireMaxLength(value, maxLength, fieldName, CommonErrorCode.VALIDATION_ERROR, ValidationException::new);
    }

    /**
     * ✅ 숫자 검증 (사용자가 원하는 예외를 지정 가능)
     */
    public static void requirePositiveNumber(
            Integer value,
            String fieldName,
            BaseErrorCode errorCode,
            BiFunction<BaseErrorCode, String, ? extends CustomException> exceptionSupplier
    ) {
        if (value == null || value <= 0) {
            String errorMessage = fieldName + "은(는) 0보다 커야 합니다.";
            throw exceptionSupplier.apply(errorCode, errorMessage);
        }
    }

    /**
     * ✅ 숫자 검증 (기본적으로 `ValidationException`을 던짐)
     */
    public static void requirePositiveNumber(Integer value, String fieldName) {
        requirePositiveNumber(value, fieldName, CommonErrorCode.VALIDATION_ERROR, ValidationException::new);
    }
}
