package com.example.dw.shop.option.entity;

import com.example.dw.shop.global.lifecycle.entity.BaseEntity;
import com.example.dw.shop.global.lifecycle.deletion.DeletableInfo;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OptionGroup extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String groupName; // 옵션 그룹명 (예: "사이즈", "색상")

    @Column(length = 255)
    private String description; // 옵션 그룹 설명

    @Embedded
    private final DeletableInfo deletableInfo = new DeletableInfo();

    @Builder
    public OptionGroup(String groupName, String description) {
        this.groupName = groupName;
        this.description = description;
    }

    public void updateGroupName(String groupName) {
        this.groupName = groupName;
    }

    public void updateDescription(String description) {
        this.description = description;
    }

    public void delete(String deletedBy) {
        this.deletableInfo.markDeleted(deletedBy);
    }

    public void restore() {
        this.deletableInfo.restore();
    }

    public boolean isDeleted() {
        return this.deletableInfo.isDeleted();
    }
}
