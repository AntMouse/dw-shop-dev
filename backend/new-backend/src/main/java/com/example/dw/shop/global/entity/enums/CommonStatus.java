package com.example.dw.shop.global.entity.enums;

import java.util.EnumSet;

public enum CommonStatus {
    ACTIVE,
    INACTIVE,
    DELETED;

    private EnumSet<CommonStatus> allowedTransitions;

    // 어떤 걸로 바꿀지 가능 여부 결정
    static {
        ACTIVE.allowedTransitions = EnumSet.of(INACTIVE);
        INACTIVE.allowedTransitions = EnumSet.of(ACTIVE);
        DELETED.allowedTransitions = EnumSet.noneOf(CommonStatus.class);
    }

    // 현재 상태에서 갈 수 있는 모든 상태를 알려주는 메서드
    public EnumSet<CommonStatus> getAllowedTransitions() {
        return EnumSet.copyOf(allowedTransitions);
    }

    // 다른 값으로 바꾸는 게 가능한지 확인하는 메서드. 위에 정해진 것에 따라 작동한다.
    public boolean canTransitionTo(CommonStatus next) {
        return allowedTransitions.contains(next);
    }

    // 해당 행위가 가능한지 확인하는 메서드
    public boolean is(CommonStatus status) {
        return this == status;
    }
}

