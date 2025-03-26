package com.example.dw.shop.common.preload;

import org.springframework.data.domain.Sort;

/**
 * ✅ 사전 데이터 로딩 유틸 (Preload Util)
 * - 최신 또는 오래된 데이터 일부만 가져오는 기능 제공
 * - 유연한 정렬 필드 지원 (기본값: createdAt)
 * - Keyset 기반으로 "다음 데이터 로드" 가능
 */
public class PreloadUtil {

    private static final int DEFAULT_LIMIT = 10000; // ✅ 기본 로딩 개수 유지
    private static final String DEFAULT_SORT_FIELD = "createdAt"; // 기본 정렬 필드

    // ✅ 객체 생성을 방지하기 위한 private 생성자
    private PreloadUtil() {
        throw new UnsupportedOperationException("PreloadUtil is a utility class and cannot be instantiated.");
    }

    /**
     * ✅ Keyset 방식: 정렬 정보만 반환 (실제 WHERE 조건은 Repository에서 적용)
     */
    public static Sort getSort(String sortBy, Sort.Direction direction) {
        return Sort.by(direction, sortBy);
    }

    /**
     * ✅ 기본 정렬 필드(createdAt) 기준 최신 데이터 정렬
     */
    public static Sort getLatestSort() {
        return getSort(DEFAULT_SORT_FIELD, Sort.Direction.DESC);
    }

    /**
     * ✅ 기본 정렬 필드(createdAt) 기준 오래된 데이터 정렬
     */
    public static Sort getOldestSort() {
        return getSort(DEFAULT_SORT_FIELD, Sort.Direction.ASC);
    }

    /**
     * ✅ 업데이트 기준 최신 데이터 정렬
     */
    public static Sort getUpdatedSort() {
        return getSort("updatedAt", Sort.Direction.DESC);
    }

    /**
     * ✅ 기본 limit 값 제공 (limit 값이 없을 경우)
     */
    public static int getDefaultLimit() {
        return DEFAULT_LIMIT;
    }
}
