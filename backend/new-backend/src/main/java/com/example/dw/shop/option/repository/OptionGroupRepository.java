package com.example.dw.shop.option.repository;

import com.example.dw.shop.option.entity.OptionGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OptionGroupRepository extends JpaRepository<OptionGroup, Long> {

    // 옵션 그룹명을 기준으로 정확히 일치하는 항목 조회
    Optional<OptionGroup> findByGroupName(String groupName);

    // 대소문자 무시 + 부분 일치 검색 + 페이징 지원
    Page<OptionGroup> findByGroupNameContainingIgnoreCase(String groupName, Pageable pageable);

    // ✅ 옵션 그룹이 존재하는지 여부 체크
    boolean existsByGroupName(String groupName);
}
