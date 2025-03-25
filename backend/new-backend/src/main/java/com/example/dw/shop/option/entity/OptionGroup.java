package com.example.dw.shop.option.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OptionGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String groupName; // 옵션 그룹명 (예: "사이즈", "색상")

    @Column(length = 255)
    private String description; // 옵션 그룹 설명

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

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
}
