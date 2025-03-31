package com.example.dw.shop.global.lifecycle.deletion;

import java.util.EnumSet;
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

    /**
     * 삭제 상태에 대한 설명을 delimiter 기준으로 구분하여 문자열 반환
     * @param components 삭제 관련 컴포넌트
     * @param delimiter 구분자 (예: ", ", "\n", " | " 등)
     * @return 설명 문자열 (e.g., "상태 필드가 삭제되었습니다, 삭제 정보 필드가 존재합니다")
     */
    public static String describe(EnumSet<DeletionComponent> components, String delimiter) {
        if (components == null || components.isEmpty()) {
            return "삭제되지 않았습니다";
        }

        return components.stream()
                .map(component -> switch (component) {
                    case STATUS -> "상태 필드가 삭제되었습니다";
                    case DELETABLE -> "삭제 정보 필드가 존재합니다";
                })
                .collect(Collectors.joining(delimiter));
    }

    // 완전 삭제 상태인지 확인 (모든 컴포넌트가 다 포함되어 있는 경우)
    // 삭제 상태이고, 삭제 시간, 삭제한 사람 등의 정보가 다 있는 삭제 정보가 다 있으면 true
    public static boolean isFullyDeleted(EnumSet<DeletionComponent> components) {
        return components != null && components.containsAll(EnumSet.allOf(DeletionComponent.class));
    }
}
