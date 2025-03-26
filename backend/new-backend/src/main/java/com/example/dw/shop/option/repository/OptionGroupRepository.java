package com.example.dw.shop.option.repository;

import com.example.dw.shop.option.entity.OptionGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OptionGroupRepository extends JpaRepository<OptionGroup, Long> {

    // 옵션 그룹명을 기준으로 정확히 일치하는 항목 조회
    Optional<OptionGroup> findByGroupName(String groupName);

    // 대소문자 무시 + 부분 일치 검색 + 페이징 지원
    Page<OptionGroup> findByGroupNameContainingIgnoreCase(String groupName, Pageable pageable);

    /**
     * ✅ Keyset 방식 페이징 (createdAt 기준 최신 데이터 로드)
     * - lastCreatedAt보다 작은 데이터 중 최신순으로 정렬하여 가져옴
     */
    Page<OptionGroup> findByCreatedAtLessThanOrderByCreatedAtDesc(
            LocalDateTime lastCreatedAt, Pageable pageable);

    Page<OptionGroup> findAllByOrderByCreatedAtDesc(Pageable pageable);

    // ✅ 옵션 그룹이 존재하는지 여부 체크
    boolean existsByGroupName(String groupName);
}
