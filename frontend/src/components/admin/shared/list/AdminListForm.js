// components/admin/shared/list/AdminListForm.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminComponentUtils } from "../../../../hooks/admin/shared/useAdminComponentUtils";

// 5. CSS 또는 스타일 파일
import styles from "./AdminListForm.module.css";

const AdminListForm = ({
  title,
  sortComponent,
  paginationComponent,
  searchComponent,
  tableComponent,
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
      <h1 className={styles.title}>{title}</h1>
      {isFeatureEnabled("search") && searchComponent}
      {isFeatureEnabled("table") && tableComponent}
      {isFeatureEnabled("pagination") && paginationComponent}
      {isFeatureEnabled("sort") && sortComponent} 
    </div>
  );
};

export default AdminListForm;
