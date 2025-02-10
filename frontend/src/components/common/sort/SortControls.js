// components/common/sort/SortControls.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useCommonStyles } from "../hooks/useCommonStyles";
import { useFeatureToggle } from "../hooks/useFeatureToggle";

// 5. CSS 또는 스타일 파일
import styles from "./SortControls.module.css";

const SortControls = ({
  handleSortChange,
  sortCriteria,
  sortDirection,
  options,
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  const containerClass = useCommonStyles(useCustomStyles, customClass, styles.container);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  if (!isFeatureEnabled("sortCriteria") && !isFeatureEnabled("sortDirection")) return null; // ✅ 모든 기능 비활성화 시 숨김

  return (
    <div className={containerClass}>
      {isFeatureEnabled("sortCriteria") && (
        <>
          <label>정렬 기준:</label>
          <select value={sortCriteria} onChange={(e) => handleSortChange(e.target.value, sortDirection)}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      )}

      {isFeatureEnabled("sortDirection") && (
        <>
          <label>정렬 방향:</label>
          <select value={sortDirection} onChange={(e) => handleSortChange(sortCriteria, e.target.value)}>
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>
        </>
      )}
    </div>
  );
};

export default SortControls;
