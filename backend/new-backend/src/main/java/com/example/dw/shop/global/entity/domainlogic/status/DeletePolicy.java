package com.example.dw.shop.global.entity.domainlogic.status;

public enum DeletePolicy {
    FORCE,  // 상태 전이 정책을 무시하고 삭제
    SAFE   // 전이 정책을 지키는 삭제
}