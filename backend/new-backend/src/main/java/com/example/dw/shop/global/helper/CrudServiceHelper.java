package com.example.dw.shop.global.helper;

import com.example.dw.shop.global.exception.customexception.CustomException;
import com.example.dw.shop.global.exception.errorcode.BaseErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.function.Function;

// 공통 CRUD 유틸 클래스 (예외 처리 + 로깅 포함)
@Slf4j
public class CrudServiceHelper {

    /**
     * ✅ ID로 엔티티 조회 (존재하지 않으면 예외 발생)
     * - `exceptionFunction`: 예외를 생성하는 함수 (예: CustomException::new, ProductException::new)
     */
    public static <T, ID> T findByIdOrThrow(
            JpaRepository<T, ID> repository,
            ID id,
            BaseErrorCode errorCode,
            Function<BaseErrorCode, ? extends CustomException> exceptionFunction
    ) {
        Optional<T> entity = repository.findById(id);

        if (entity.isEmpty()) {
            log.error("엔티티 조회 실패: ID={}, 오류 코드={}, 메시지={}", id, errorCode.getStatus(), errorCode.getMessage());
            throw exceptionFunction.apply(errorCode); // ✅ 예외 던짐
        }

        return entity.get();
    }

    /**
     * 중복 여부 검사 기본 코드(중복된 경우 예외 발생)
     * - `exceptionFunction`: 예외를 생성하는 함수 (예: CustomException::new, ValidationException::new)
     */
    public static void checkDuplicateOrThrow(
            boolean exists,
            String value,
            String valueName,
            BaseErrorCode errorCode,
            Function<BaseErrorCode, ? extends CustomException> exceptionFunction
    ) {
        if (exists) {
            log.warn("중복된 데이터 존재: {}={}, 오류 코드={}, 메시지={}", valueName, value, errorCode.getStatus(), errorCode.getMessage());
            throw exceptionFunction.apply(errorCode); // ✅ 예외 던짐
        }
    }

    // 중복 여부 검사 findBy + field 전용 코드
    public static <T> void checkDuplicateOrThrow(
            Optional<T> optionalValue,
            String value,
            String valueName,
            BaseErrorCode errorCode,
            Function<BaseErrorCode, ? extends CustomException> exceptionFunction
    ) {
        checkDuplicateOrThrow(optionalValue.isPresent(), value, valueName, errorCode, exceptionFunction);
    }
}
