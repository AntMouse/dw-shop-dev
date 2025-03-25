package com.example.dw.shop.option.controller;

import com.example.dw.shop.common.response.ApiResponse;
import com.example.dw.shop.option.dto.OptionGroupListDto;
import com.example.dw.shop.option.dto.OptionGroupRequestDto;
import com.example.dw.shop.option.dto.OptionGroupResponseDto;
import com.example.dw.shop.option.dto.OptionGroupUpdateDto;
import com.example.dw.shop.option.service.OptionGroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;


import java.util.List;

@Slf4j // ✅ Slf4j 로깅 추가
@RestController
@RequestMapping("/api/option-groups")
@RequiredArgsConstructor
@Validated
public class OptionGroupController {

    private final OptionGroupService optionGroupService;

    // ✅ 옵션 그룹 생성
    @PostMapping
    public ResponseEntity<ApiResponse<OptionGroupResponseDto>> createOptionGroup(
            @Valid @RequestBody OptionGroupRequestDto dto) {
        log.info("옵션 그룹 생성 API 호출: {}", dto);
        OptionGroupResponseDto createdOptionGroup = optionGroupService.createOptionGroup(dto);
        return ResponseEntity.ok(ApiResponse.success(createdOptionGroup, "옵션 그룹이 생성되었습니다."));
    }

    // ✅ 모든 옵션 그룹 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<Page<OptionGroupListDto>>> getAllOptionGroups(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        log.info("옵션 그룹 목록 조회 API 호출");
        Page<OptionGroupListDto> optionGroups = optionGroupService.getAllOptionGroups(search, pageable);
        return ResponseEntity.ok(ApiResponse.success(optionGroups, "옵션 그룹 목록 조회 성공"));
    }

    // ✅ 특정 옵션 그룹 조회
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OptionGroupResponseDto>> getOptionGroupById(@PathVariable Long id) {
        log.info("옵션 그룹 상세 조회 API 호출: ID={}", id);
        OptionGroupResponseDto optionGroup = optionGroupService.getOptionGroupById(id);
        return ResponseEntity.ok(ApiResponse.success(optionGroup, "옵션 그룹 상세 조회 성공"));
    }

    // ✅ 옵션 그룹 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OptionGroupResponseDto>> updateOptionGroup(
            @PathVariable Long id,
            @Valid @RequestBody OptionGroupUpdateDto dto) {
        log.info("옵션 그룹 수정 API 호출: ID={}, DTO={}", id, dto);
        OptionGroupResponseDto updatedOptionGroup = optionGroupService.updateOptionGroup(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updatedOptionGroup, "옵션 그룹이 수정되었습니다."));
    }

    // ✅ 옵션 그룹 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteOptionGroup(@PathVariable Long id) {
        log.info("옵션 그룹 삭제 API 호출: ID={}", id);
        optionGroupService.deleteOptionGroup(id);
        return ResponseEntity.ok(ApiResponse.success(null, "옵션 그룹이 삭제되었습니다."));
    }
}
