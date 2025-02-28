// components/admin/shared/table/AdminTableHeader.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useCommonStyles } from "../../../common/hooks/useCommonStyles";
import { useFeatureToggle } from "../../../common/hooks/useFeatureToggle";

// 5. CSS 또는 스타일 파일
import styles from "./AdminTableHeader.module.css";

const AdminTableHeader = ({
  columns,
  columnClasses = [],
  useCustomStyles = false,
  customClass = "",
  enabledFeatures = [], // ✅ 기능 활성화 여부 추가
}) => {
  const tableHeaderClass = useCommonStyles(useCustomStyles, customClass, styles.tableHeader);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  if (!enabledFeatures.length || enabledFeatures.every((feature) => !isFeatureEnabled(feature))) return null;

  // ✅ "번호" 열을 포함한 테이블 컬럼 구성
  const tableColumns = ["번호", ...columns];

  return (
    <thead className={tableHeaderClass}>
      <tr>
        {/* ✅ tableHeader가 활성화된 경우에만 실행 */}
        {isFeatureEnabled("tableHeader") &&
          tableColumns.map((column, index) => (
            <th key={index} className={columnClasses[index] ? styles[columnClasses[index]] : ""}>
              {column}
            </th>
          ))}
      </tr>
    </thead>
  );
};

export default AdminTableHeader;