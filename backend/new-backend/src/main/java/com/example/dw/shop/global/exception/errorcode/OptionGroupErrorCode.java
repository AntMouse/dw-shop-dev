package com.example.dw.shop.global.exception.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OptionGroupErrorCode implements BaseErrorCode {
    INVALID_OPTION_GROUP_NAME(400, "옵션 그룹명은 필수 입력값입니다."),
    INVALID_DESCRIPTION_LENGTH(400, "설명은 최대 255자까지 입력할 수 있습니다."),
    DUPLICATE_OPTION_GROUP(400, "이미 존재하는 옵션 그룹명입니다."),
    OPTION_GROUP_NOT_FOUND(404, "해당 옵션 그룹이 존재하지 않습니다.");

    private final int status;
    private final String message;
}
