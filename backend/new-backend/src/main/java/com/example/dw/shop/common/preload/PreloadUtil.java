package com.example.dw.shop.common.preload;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * ✅ 사전 데이터 로딩 유틸 (Preload Util)
 * - 최신 또는 오래된 데이터 일부만 가져오는 기능 제공
 * - 유연한 정렬 필드 지원 (기본값: createdAt)
 * - Keyset 기반으로 "다음 데이터 로드" 가능
 */
public class PreloadUtil {

    private static final int DEFAULT_LIMIT = 10000; // 기본 로딩 개수
    private static final String DEFAULT_SORT_FIELD = "createdAt"; // 기본 정렬 필드

    // ✅ 객체 생성을 방지하기 위한 private 생성자
    private PreloadUtil() {
        throw new UnsupportedOperationException("PreloadUtil is a utility class and cannot be instantiated.");
    }

    /**
     * ✅ Keyset 방식: 마지막 ID 기반으로 다음 데이터 로드
     * @param limit 가져올 데이터 개수
     * @param lastValue 마지막으로 가져온 데이터의 정렬 필드 값 (예: createdAt)
     * @param sortBy 정렬 기준 필드
     * @param direction 정렬 방향 (ASC / DESC)
     */
    public static Pageable getNextPreload(int limit, Comparable<?> lastValue, String sortBy, Sort.Direction direction) {
        if (lastValue == null) {
            // 첫 번째 페이지일 경우 기본 프리로드 사용
            return PageRequest.of(0, limit, Sort.by(direction, sortBy));
        }
        return PageRequest.of(0, limit, Sort.by(direction, sortBy));
        // 🚨 실제 Keyset 방식 적용 시, Repository에서 WHERE 조건을 추가해야 함.
    }

    /**
     * ✅ 기본 정렬 필드(createdAt) 기준 최신 데이터 일부 로드
     */
    public static Pageable getLatestDataPreload(int limit) {
        return getNextPreload(limit, null, DEFAULT_SORT_FIELD, Sort.Direction.DESC);
    }

    public static Pageable getLatestDataPreload() {
        return getLatestDataPreload(DEFAULT_LIMIT);
    }

    /**
     * ✅ 기본 정렬 필드(createdAt) 기준 오래된 데이터 일부 로드
     */
    public static Pageable getOldestDataPreload(int limit) {
        return getNextPreload(limit, null, DEFAULT_SORT_FIELD, Sort.Direction.ASC);
    }

    public static Pageable getOldestDataPreload() {
        return getOldestDataPreload(DEFAULT_LIMIT);
    }

    /**
     * ✅ 업데이트 기준 최신 데이터 일부 로드
     */
    public static Pageable getUpdatedDataPreload(int limit) {
        return getNextPreload(limit, null, "updatedAt", Sort.Direction.DESC);
    }

    public static Pageable getUpdatedDataPreload() {
        return getUpdatedDataPreload(DEFAULT_LIMIT);
    }
}
