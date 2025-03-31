package com.example.dw.shop.global.lifecycle.deletion;

import lombok.Getter;

@Getter
public class RestoreResultEntry {

    // 하드코딩된 필드명을 상수로 선언하여 재사용성과 안정성 확보
    public static final String RESTORE_FIELD_STATUS = "status";
    public static final String RESTORE_FIELD_DELETABLE = "deletable";

    private final String field;              // "status", "deletable" 등
    private final RestoreStatus status;      // 복원 결과

    public RestoreResultEntry(String field, RestoreStatus status) {
        this.field = field;
        this.status = status;
    }

    @Override
    public String toString() {
        return field + " : " + status;
    }
}