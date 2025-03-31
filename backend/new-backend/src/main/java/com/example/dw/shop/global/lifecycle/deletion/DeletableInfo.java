package com.example.dw.shop.global.lifecycle.deletion;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DeletableInfo {

    @Column
    private LocalDateTime deletedAt;

    @Column
    private String deletedBy;

    // 데이터 삭제 처리. 실제 삭제는 아니고 삭제가 된 것으로 처리를 한다.
    public void markDeleted(String deletedBy) {
        this.deletedAt = LocalDateTime.now();
        this.deletedBy = deletedBy;
    }

    // 삭제된 상태인지 아닌지 체크하는 함수.
    public boolean isDeleted() {
        return deletedAt != null;
    }

    // 삭제 복원 처리. 삭제 상태를 초기화함.
    public void restore() {
        this.deletedAt = null;
        this.deletedBy = null;
    }

    // 로깅 출력용 코드
    @Override
    public String toString() {
        return isDeleted()
                ? "Deleted at " + deletedAt + " by " + deletedBy
                : "Not deleted";
    }
}
