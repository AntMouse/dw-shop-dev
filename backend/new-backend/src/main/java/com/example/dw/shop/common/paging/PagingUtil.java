package com.example.dw.shop.common.paging;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * ✅ 일반 페이징 유틸 (Pagination Util)
 * - 클라이언트 요청에 맞는 Pageable 객체 생성
 */
public class PagingUtil {

    private static final int DEFAULT_PAGE_SIZE = 10; // 기본 페이지 크기

    /**
     * ✅ 사용자 요청에 맞춘 페이징 생성
     */
    public static Pageable getPageable(int page, int size, String sortField, Sort.Direction direction) {
        int pageSize = (size > 0) ? size : DEFAULT_PAGE_SIZE;
        return PageRequest.of(page, pageSize, Sort.by(direction, sortField));
    }

    /**
     * ✅ 기본 페이징 설정 (10개씩, 최신순)
     */
    public static Pageable getDefaultPageable() {
        return PageRequest.of(0, DEFAULT_PAGE_SIZE, Sort.by("createdAt").descending());
    }
}
