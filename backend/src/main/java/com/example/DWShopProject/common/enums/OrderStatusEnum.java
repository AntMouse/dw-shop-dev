package com.example.DWShopProject.common.enums;

public enum OrderStatusEnum {
    PENDING("배송준비"),
    COMPLETED("배송완료");

    private final String displayName;

    OrderStatusEnum(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}