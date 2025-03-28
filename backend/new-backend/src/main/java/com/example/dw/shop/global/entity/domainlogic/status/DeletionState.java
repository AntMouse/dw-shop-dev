package com.example.dw.shop.global.entity.domainlogic.status;

public enum DeletionState {
    NONE,                 // 삭제 아님
    STATUS_ONLY,          // CommonStatusInfo만 삭제
    DELETABLE_ONLY,             // DeletableInfo만 삭제
    FULLY_DELETED                  // 둘 다 삭제
}
