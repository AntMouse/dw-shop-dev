// components/admin/member/AdminMemberSortControls.js

// 1. React 기본 라이브러리
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminSortControls from "../shared/sort/AdminSortControls";

const AdminMemberSortControls = ({
  memberSortCriteria,
  handleMemberSortCriteriaChange,
  memberSortDirection,
  handleMemberSortDirectionChange,
  memberSortCriteriaOptions,
  enabledFeatures,
  useCustomStyles,
  customClass,
}) => {
  return (
    <AdminSortControls
      sortCriteria={memberSortCriteria}
      handleSortCriteriaChange={handleMemberSortCriteriaChange}
      sortDirection={memberSortDirection}  
      handleSortDirectionChange={handleMemberSortDirectionChange}
      sortCriteriaOptions={memberSortCriteriaOptions}
      enabledFeatures={enabledFeatures}
      useCustomStyles={useCustomStyles}
      customClass={customClass}
    />
  );
};

export default AdminMemberSortControls;