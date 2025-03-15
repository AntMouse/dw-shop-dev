// components/admin/shared/sort/AdminSortControls.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminComponentUtils } from "../../../../hooks/admin/shared/useAdminComponentUtils";

// 5. CSS 또는 스타일 파일
import styles from "./AdminSortControls.module.css";

const AdminSortControls = ({
  sortCriteria,
  handleSortCriteriaChange,
  sortDirection,
  handleSortDirectionChange,
  sortCriteriaOptions = [],
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  const { isFeatureEnabled, isAnyFeatureEnabled, containerClass } = useAdminComponentUtils(
    enabledFeatures,
    useCustomStyles,
    customClass,
    styles.container,
  );

  if (!isAnyFeatureEnabled) return null;

  return (
    <div className={containerClass}>
      {isFeatureEnabled("sortCriteria") && (
        <>
          <label>정렬 기준</label>
          <select value={sortCriteria} onChange={(e) => handleSortCriteriaChange(e.target.value)}>
            {sortCriteriaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      )}

      {isFeatureEnabled("sortDirection") && (
        <>
          <label>정렬 방향</label>
          <select value={sortDirection} onChange={(e) => handleSortDirectionChange(e.target.value)}>
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>
        </>
      )}
    </div>
  );
};

export default AdminSortControls;
