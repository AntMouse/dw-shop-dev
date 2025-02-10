// components/common/table/TableHeader.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useCommonStyles } from "../hooks/useCommonStyles";
import { useFeatureToggle } from "../hooks/useFeatureToggle";

// 5. CSS 또는 스타일 파일
import styles from "./TableHeader.module.css";

const TableHeader = ({
  columns,
  columnClasses = [],
  useCustomStyles = false,
  customClass = "",
  enabledFeatures = [], // ✅ 기능 활성화 여부 추가
}) => {
  const tableHeaderClass = useCommonStyles(useCustomStyles, customClass, styles.tableHeader);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  // ✅ 기능이 비활성화된 경우 렌더링하지 않음
  if (!isFeatureEnabled("tableHeader")) return null;

  if (!columns || columns.length === 0) return null;

  return (
    <thead className={tableHeaderClass}>
      <tr>
        {columns.map((column, index) => (
          <th key={index} className={columnClasses[index] ? styles[columnClasses[index]] : ""}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;