package com.example.dw.shop.global.entity.embeddable;

import com.example.dw.shop.global.entity.enums.CommonStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommonStatusInfo {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommonStatus commonStatus = CommonStatus.ACTIVE;

    public void deactivate() {
        if (this.commonStatus == CommonStatus.DELETED) {
            throw new IllegalStateException("삭제된 항목은 비활성화할 수 없습니다.");
        }
        this.commonStatus = CommonStatus.INACTIVE;
    }

    public void delete() {
        this.commonStatus = CommonStatus.DELETED;
    }

    public boolean isActive() {
        return this.commonStatus == CommonStatus.ACTIVE;
    }

    public boolean isInactive() {
        return this.commonStatus == CommonStatus.INACTIVE;
    }

    public boolean isDeleted() {
        return this.commonStatus == CommonStatus.DELETED;
    }

    @Override
    public String toString() {
        return "Status: " + commonStatus.name();
    }
}