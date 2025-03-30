package com.example.dw.shop.global.lifecycle.status;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;

public class CommonStatusTransitionConfig {

    private static final Map<CommonStatus, EnumSet<CommonStatus>> transitionMap = new EnumMap<>(CommonStatus.class);

    static {
        transitionMap.put(CommonStatus.ACTIVE, EnumSet.of(CommonStatus.INACTIVE, CommonStatus.DELETED));
        transitionMap.put(CommonStatus.INACTIVE, EnumSet.of(CommonStatus.ACTIVE, CommonStatus.DELETED));
        transitionMap.put(CommonStatus.DELETED, EnumSet.noneOf(CommonStatus.class));
    }

    // 현재 상태에서 갈 수 있는 모든 상태를 알려주는 메서드
    public static EnumSet<CommonStatus> getAllowedTransitions(CommonStatus from) {
        return transitionMap.getOrDefault(from, EnumSet.noneOf(CommonStatus.class));
    }

    // 다른 값으로 바꾸는 게 가능한지 확인하는 메서드. 위에 정해진 것에 따라 작동한다.
    public static boolean canTransition(CommonStatus from, CommonStatus to) {
        return transitionMap.getOrDefault(from, EnumSet.noneOf(CommonStatus.class)).contains(to);
    }

    // 해당 행위가 가능한지 확인하는 메서드
    public static boolean is(CommonStatus current, CommonStatus target) {
        return current == target;
    }
}
