package com.example.dw.shop.global.lifecycle.deletion;

import java.util.EnumSet;
import java.util.Set;
import java.util.stream.Collectors;

public class DeletionStateClassifier {

    // 조합 기반 상태명 리턴 (e.g., DELETABLE_STATUS)
    public static String classify(EnumSet<DeletionComponent> components) {
        if (components == null || components.isEmpty()) {
            return "NONE";
        }

        // 방어적 복사
        EnumSet<DeletionComponent> safeSet = EnumSet.copyOf(components);

        return safeSet.stream()
                .map(Enum::name)
                .sorted()
                .collect(Collectors.joining("_"));
    }

    // 각 상태를 설명하는 string 리턴
    public static String describe(EnumSet<DeletionComponent> components) {
        if (components == null || components.isEmpty()) return "삭제되지 않음";

        return components.stream()
                .map(component -> switch (component) {
                    case STATUS -> "상태 필드가 삭제됨";
                    case DELETABLE -> "삭제 정보 필드가 존재함";
                })
                .collect(Collectors.joining(", "));
    }

    // 특정 삭제 컴포넌트가 포함되어 있는지 확인
    public static boolean contains(Set<DeletionComponent> components, DeletionComponent target) {
        return components != null && components.contains(target);
    }

    // 완전 삭제 상태인지 확인 (모든 컴포넌트가 다 포함되어 있는 경우)
    // 삭제 상태이고, 삭제 시간, 삭제한 사람 등의 정보가 다 있는 삭제 정보가 다 있으면 true
    public static boolean isFullyDeleted(EnumSet<DeletionComponent> components) {
        return components.containsAll(EnumSet.allOf(DeletionComponent.class));
    }

    // 둘 다 삭제 안 됐을 경우 true 반환
    public static boolean isNotDeleted(EnumSet<DeletionComponent> components) {
        return components == null || components.isEmpty();
    }

    // 단일 컴포넌트만 삭제된 경우 true 리턴
    public static boolean isSingleDeleted(EnumSet<DeletionComponent> components) {
        return components.size() == 1;
    }

    // 두 개 이상 삭제된 경우지만 완전 삭제는 아닌 상태라면 true를 반환
    public static boolean isPartiallyDeleted(EnumSet<DeletionComponent> components) {
        return components.size() > 1 && !isFullyDeleted(components);
    }

    // 삭제된 컴포넌트 수를 반환
    public static int countDeletedComponents(EnumSet<DeletionComponent> components) {
        return components != null ? components.size() : 0;
    }
}
