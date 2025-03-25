package com.example.dw.shop.common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * ✅ 공통 API 응답 형식
 * - 성공 응답과 실패 응답을 통일하여 처리
 */
@Getter
@RequiredArgsConstructor
public class ApiResponse<T> {
    private final boolean success;
    private final String message;
    private final T data;

    /**
     * ✅ 성공 응답 생성
     */
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, message, data);
    }

    /**
     * ✅ 실패 응답 생성
     */
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null);
    }
}