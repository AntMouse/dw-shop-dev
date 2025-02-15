// components/admin/shared/list/AdminListForm.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

import { useCommonStyles } from "../../../common/hooks/useCommonStyles";
import { useFeatureToggle } from "../../../common/hooks/useFeatureToggle";

// 5. CSS 또는 스타일 파일
import styles from "./AdminListForm.module.css";

const AdminListForm = ({
  title,
  searchComponent,
  tableComponent,
  paginationComponent,
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  const containerClass = useCommonStyles(useCustomStyles, customClass, styles.container);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  return (
    <div className={containerClass}>
      <h1 className={styles.title}>{title}</h1>
      {isFeatureEnabled("search") && searchComponent}
      {isFeatureEnabled("table") && tableComponent}
      {isFeatureEnabled("pagination") && paginationComponent}
    </div>
  );
};

export default AdminListForm;
