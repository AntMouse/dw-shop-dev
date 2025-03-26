package com.example.dw.shop.option.service;

import com.example.dw.shop.common.preload.PreloadUtil;
import com.example.dw.shop.global.exception.customexception.DuplicateEntryException;
import com.example.dw.shop.global.exception.customexception.EntityNotFoundException;
import com.example.dw.shop.global.exception.errorcode.OptionGroupErrorCode;
import com.example.dw.shop.global.helper.CrudServiceHelper;
import com.example.dw.shop.global.validator.FieldValidationUtil;
import com.example.dw.shop.option.dto.*;
import com.example.dw.shop.option.entity.OptionGroup;
import com.example.dw.shop.option.mapper.OptionGroupMapper;
import com.example.dw.shop.option.repository.OptionGroupRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.StringUtils;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class OptionGroupService {

    private final OptionGroupRepository optionGroupRepository;
    private final OptionGroupMapper optionGroupMapper;

    /**
     * ✅ 옵션 그룹 생성
     */
    @Transactional
    public OptionGroupResponseDto createOptionGroup(OptionGroupRequestDto dto) {
        log.info("옵션 그룹 생성 요청: {}", dto);

        // 입력값 검증 및 해당 예외 처리
        FieldValidationUtil.requireNonEmpty(dto.getGroupName(), "옵션 그룹명");
        FieldValidationUtil.requireMinLength(dto.getGroupName(), 2, "옵션 그룹명");
        FieldValidationUtil.requireMaxLength(dto.getGroupName(), 50, "옵션 그룹명");
        FieldValidationUtil.requireMaxLength(dto.getDescription(), 255, "설명");

        // 중복 체크 및 예외 처리
        CrudServiceHelper.checkDuplicateOrThrow(
                optionGroupRepository.findByGroupName(dto.getGroupName()),
                dto.getGroupName(),
                "옵션 그룹명",
                OptionGroupErrorCode.DUPLICATE_OPTION_GROUP,
                DuplicateEntryException::new
        );

        OptionGroup optionGroup = optionGroupMapper.toRequestEntity(dto);
        OptionGroup savedOptionGroup = optionGroupRepository.save(optionGroup);

        log.info("옵션 그룹 생성 완료: {}", savedOptionGroup);
        return optionGroupMapper.toResponseDto(savedOptionGroup);
    }

    /*
    @Transactional(readOnly = true)
    public Page<OptionGroupListDto> getAllOptionGroups(String search, Pageable pageable, Sort sort) {
        log.info("옵션 그룹 목록 조회 요청: search={}, pageable={}, sort={}", search, pageable, sort);

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        if (StringUtils.hasText(search)) {
            return optionGroupRepository.findByGroupNameContainingIgnoreCase(search, sortedPageable)
                    .map(optionGroupMapper::toListDto);
        }

        return optionGroupRepository.findAll(sortedPageable)
                .map(optionGroupMapper::toListDto);
    }
    */

    @Transactional(readOnly = true)
    public Page<OptionGroup> getPagedOptionGroups(LocalDateTime lastCreatedAt, int limit) {
        Pageable pageable = PageRequest.of(0, limit, PreloadUtil.getLatestSort());

        if (lastCreatedAt == null) {
            // 처음 로드할 경우 최신 데이터 10,000개 가져옴
            return optionGroupRepository.findAllByOrderByCreatedAtDesc(pageable);
        }

        // Keyset 기반 다음 데이터 로드
        return optionGroupRepository.findByCreatedAtLessThanOrderByCreatedAtDesc(lastCreatedAt, pageable);
    }

    /**
     * ✅ 옵션 그룹 단건 상세 조회
     */
    @Transactional(readOnly = true)
    public OptionGroupResponseDto getOptionGroupById(Long id) {
        log.info("옵션 그룹 상세 조회 요청: ID={}", id);

        // id 값이 있는지 체크 및 예외 처리
        OptionGroup optionGroup = CrudServiceHelper.findByIdOrThrow(
                optionGroupRepository,
                id,
                OptionGroupErrorCode.OPTION_GROUP_NOT_FOUND,
                EntityNotFoundException::new
        );

        return optionGroupMapper.toResponseDto(optionGroup);
    }

    /**
     * ✅ 옵션 그룹 수정
     */
    public OptionGroupResponseDto updateOptionGroup(Long id, OptionGroupUpdateDto dto) {
        log.info("옵션 그룹 수정 요청: ID={}, DTO={}", id, dto);

        OptionGroup optionGroup = CrudServiceHelper.findByIdOrThrow(
                optionGroupRepository,
                id,
                OptionGroupErrorCode.OPTION_GROUP_NOT_FOUND,
                EntityNotFoundException::new
        );

        optionGroupMapper.updateEntityFromDto(dto, optionGroup);
        OptionGroup updatedOptionGroup = optionGroupRepository.save(optionGroup);

        log.info("옵션 그룹 수정 완료: {}", updatedOptionGroup);
        return optionGroupMapper.toResponseDto(updatedOptionGroup);
    }

    /**
     * ✅ 옵션 그룹 삭제
     */
    public void deleteOptionGroup(Long id) {
        log.info("옵션 그룹 삭제 요청: ID={}", id);

        // ✅ 공통 헬퍼 사용 (ID 조회) - `ValidationException`을 던짐
        CrudServiceHelper.findByIdOrThrow(
                optionGroupRepository,
                id,
                OptionGroupErrorCode.OPTION_GROUP_NOT_FOUND,
                EntityNotFoundException::new
        );

        optionGroupRepository.deleteById(id);
        log.info("옵션 그룹 삭제 완료: ID={}", id);
    }
}