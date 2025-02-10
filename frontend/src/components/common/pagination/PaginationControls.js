// components/common/pagination/PaginationControls.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useCommonStyles } from "../hooks/useCommonStyles";
import { useFeatureToggle } from "../hooks/useFeatureToggle";

// 5. CSS 또는 스타일 파일
import styles from "./PaginationControls.module.css";

const PaginationControls = ({
  itemsPerPage,
  handleItemsPerPageChange,
  totalItems,
  perPageOptions = [5, 10, 20, 50],
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  const containerClass = useCommonStyles(useCustomStyles, customClass, styles.container);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  if (!isFeatureEnabled("paginationControls")) return null;

  return (
    <div className={containerClass}>
      <label>페이지당 항목 수:</label>
      <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
        {perPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        {totalItems > 0 && (
          <option value={totalItems}>전체보기</option>
        )}
      </select>
    </div>
  );
};

export default PaginationControls;