package com.example.dw.shop.global.entity.embeddable;

import com.example.dw.shop.global.exception.customexception.ValidationException;
import com.example.dw.shop.global.exception.errorcode.CommonErrorCode;
import com.example.dw.shop.global.entity.enums.CommonStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.EnumSet;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommonStatusInfo {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommonStatus commonStatus = CommonStatus.ACTIVE;

    // 현재 상태에서 갈 수 있는 모든 상태를 알려주는 메서드
    public EnumSet<CommonStatus> getAvailableNextStatuses() {
        return commonStatus.getAllowedTransitions();
    }

    // 공용 상태 값 바꾸는 메서드
    public void changeStatus(CommonStatus next) {
        if (!commonStatus.canTransitionTo(next)) {
            throw new ValidationException(CommonErrorCode.INVALID_STATUS_TRANSITION,
                    "현재 상태(" + commonStatus + ")에서는 " + next + "로 전이할 수 없습니다.");
        }
        this.commonStatus = next;
    }

    // 삭제 처리(예외)
    public void delete() {
        this.commonStatus = CommonStatus.DELETED;
    }

    // 상태 체크
    public boolean isActive() {
        return commonStatus.is(CommonStatus.ACTIVE);
    }

    public boolean isInactive() {
        return commonStatus.is(CommonStatus.INACTIVE);
    }

    public boolean isDeleted() {
        return commonStatus.is(CommonStatus.DELETED);
    }

    @Override
    public String toString() {
        return "Status: " + commonStatus.name();
    }
}