package com.example.dw.shop.global.entity.domainlogic;

import com.example.dw.shop.global.entity.embeddable.CommonStatusInfo;
import com.example.dw.shop.global.entity.embeddable.DeletableInfo;
import com.example.dw.shop.global.entity.enums.CommonStatus;
import com.example.dw.shop.global.entity.domainlogic.status.DeletePolicy;
import com.example.dw.shop.global.entity.domainlogic.status.DeletionState;

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

    // 단순 삭제 상태 확인
    public static boolean isDeleted(CommonStatusInfo statusInfo, DeletableInfo deletableInfo) {
        return statusInfo.isDeleted() || deletableInfo.isDeleted();
    }

    // 삭제 상태 세부 확인
    public static DeletionState detectDeletionState(CommonStatusInfo statusInfo, DeletableInfo deletableInfo) {
        boolean statusDeleted = statusInfo != null && statusInfo.isDeleted();
        boolean logDeleted = deletableInfo != null && deletableInfo.isDeleted();

        if (statusDeleted && logDeleted) {
            return DeletionState.FULLY_DELETED;
        } else if (statusDeleted) {
            return DeletionState.STATUS_ONLY;
        } else if (logDeleted) {
            return DeletionState.DELETABLE_ONLY;
        } else {
            return DeletionState.NONE;
        }
    }

    // 복원 처리 (삭제 취소)
    public static void restore(CommonStatusInfo statusInfo, DeletableInfo deletableInfo) {
        statusInfo.changeStatusForcefully(CommonStatus.ACTIVE); // 복원은 항상 강제 허용
        deletableInfo.restore();
    }
}