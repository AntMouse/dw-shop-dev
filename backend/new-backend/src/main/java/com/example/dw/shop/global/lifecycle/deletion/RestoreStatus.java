package com.example.dw.shop.global.lifecycle.deletion;

public enum RestoreStatus {
    SUCCESS,              // 복원 성공
    NOT_DELETED,       // 원래 복원할 필요가 없음
    FAILED                // null 등으로 복원 자체 실패
}