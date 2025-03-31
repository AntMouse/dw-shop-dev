package com.example.dw.shop.global.lifecycle.deletion;

import com.example.dw.shop.global.lifecycle.status.CommonStatusInfo;
import com.example.dw.shop.global.lifecycle.status.CommonStatus;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

public class DeleteHandler {

    /**
     * 삭제 정책에 따라 soft delete 수행
     *
     * - FORCE: 상태 전이 정책을 무시하고 삭제 (예: 관리자 강제 삭제)
     * - SAFE : 상태 전이가 가능한 경우에만 삭제 (예: 일반 사용자)
     *
     * 주의:
     *  - FORCE는 현재 상태가 어떤 것이든 DELETED로 바꾸므로,
     *    복구가 불가능하거나 위험한 도메인에는 주의해서 사용.
     *  - SAFE는 EnumSet 전이 허용 여부에 따라 예외가 발생할 수 있음.
     */
    // 정책 기반 삭제
    public static void softDelete(CommonStatusInfo statusInfo, DeletableInfo deletableInfo, String deletedBy, DeletePolicy policy) {
        if (policy == DeletePolicy.FORCE) {
            statusInfo.changeStatusForcefully(CommonStatus.DELETED);
        } else {
            statusInfo.changeStatusSafely(CommonStatus.DELETED);
        }
        deletableInfo.markDeleted(deletedBy);
    }

    // 안전 삭제
    public static void softDeleteSafely(CommonStatusInfo statusInfo, DeletableInfo deletableInfo, String deletedBy) {
        softDelete(statusInfo, deletableInfo, deletedBy, DeletePolicy.SAFE);
    }

    // 강제 삭제
    public static void softDeleteForcefully(CommonStatusInfo statusInfo, DeletableInfo deletableInfo, String deletedBy) {
        softDelete(statusInfo, deletableInfo, deletedBy, DeletePolicy.FORCE);
    }

    // 삭제된 컴포넌트 EnumSet 반환. 어떤 컴포넌트가 삭제되었는제 데이터(자료구조)를 리턴. 내부 코드 답변 용도.
    private static EnumSet<DeletionComponent> detectDeletedComponents(CommonStatusInfo statusInfo, DeletableInfo deletableInfo) {
        EnumSet<DeletionComponent> components = EnumSet.noneOf(DeletionComponent.class);
        if (statusInfo != null && statusInfo.isDeleted()) {
            components.add(DeletionComponent.STATUS);
        }
        if (deletableInfo != null && deletableInfo.isDeleted()) {
            components.add(DeletionComponent.DELETABLE);
        }
        return components;
    }

    // 삭제 상태 문자열 분류. 내가 따로 만든 메서드로 삭제 상태를 조합해서 리턴. 사용자에게 보여줄 UI 용도.
    public static String detectDeletionStatus(CommonStatusInfo statusInfo, DeletableInfo deletableInfo) {
        EnumSet<DeletionComponent> components = detectDeletedComponents(statusInfo, deletableInfo);
        return DeletionStateClassifier.classify(components);
    }

    // 삭제 상태 설명 문자열 반환 ("상태 필드가 삭제되었습니다, 삭제 정보 필드가 존재합니다")
    public static String describeDeletionStatus(CommonStatusInfo statusInfo, DeletableInfo deletableInfo) {
        EnumSet<DeletionComponent> components = detectDeletedComponents(statusInfo, deletableInfo);
        return DeletionStateClassifier.describe(components, "\n");
    }

    // 삭제 처리가 전부 제대로 되었는지 체크하는 메서드
    public static boolean isFullyDeleted(CommonStatusInfo statusInfo, DeletableInfo deletableInfo) {
        EnumSet<DeletionComponent> components = detectDeletedComponents(statusInfo, deletableInfo);
        return DeletionStateClassifier.isFullyDeleted(components);
    }

    private static RestoreResultEntry restoreSingle(String field, Boolean isDeleted, Runnable restoreAction) {
        if (isDeleted == null) {
            return new RestoreResultEntry(field, RestoreStatus.FAILED);
        } else if (!isDeleted) {
            return new RestoreResultEntry(field, RestoreStatus.NOT_DELETED);
        } else {
            restoreAction.run();
            return new RestoreResultEntry(field, RestoreStatus.SUCCESS);
        }
    }

    // 복원 처리 (삭제 취소)
    public static List<RestoreResultEntry> restore(CommonStatusInfo statusInfo, DeletableInfo deletableInfo) {
        List<RestoreResultEntry> results = new ArrayList<>();

        results.add(restoreSingle(
                RestoreResultEntry.RESTORE_FIELD_STATUS,
                statusInfo != null ? statusInfo.isDeleted() : null,
                () -> { if (statusInfo != null) statusInfo.changeStatusForcefully(CommonStatus.ACTIVE); }
        ));

        results.add(restoreSingle(
                RestoreResultEntry.RESTORE_FIELD_DELETABLE,
                deletableInfo != null ? deletableInfo.isDeleted() : null,
                () -> { if (deletableInfo != null) deletableInfo.restore(); }
        ));

        return results;
    }
}