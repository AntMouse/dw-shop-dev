// components/admin/member/AdminMemberSearchControls.js

// 1. React 기본 라이브러리
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminSearchControls from "../shared/search/AdminSearchControls";

const AdminMemberSearchControls = ({
  memberSearchTerm, 
  handleMemberSearchTermChange, 
  memberSearchField, 
  handleMemberSearchFieldChange, 
  memberSelectedSearchPeriod, 
  handleMemberSearchPeriodChange, 
  memberSearchFilters, 
  handleMemberSearchFilterChange, 
  getMemberSearchResults,
  handleMemberSearchKeyPress,
  handleMemberSearchSubmit,
  memberSearchFieldsOptions,
  memberSearchPeriodOptions,
  enabledFeatures,
  useCustomStyles,
  customClass,
}) => {
  return (
    <AdminSearchControls
      searchTerm={memberSearchTerm}
      handleSearchTermChange={handleMemberSearchTermChange}
      searchField={memberSearchField}
      handleSearchFieldChange={handleMemberSearchFieldChange}
      selectedSearchPeriod={memberSelectedSearchPeriod}
      handleSearchPeriodChange={handleMemberSearchPeriodChange}
      searchFilters={memberSearchFilters}
      handleSearchFilterChange={handleMemberSearchFilterChange}
      getSearchResults={getMemberSearchResults}
      handleSearchKeyPress={handleMemberSearchKeyPress}
      handleSearchSubmit={handleMemberSearchSubmit}
      searchFieldsOptions={memberSearchFieldsOptions}
      searchPeriodOptions={memberSearchPeriodOptions}
      enabledFeatures={enabledFeatures}
      useCustomStyles={useCustomStyles}
      customClass={customClass}
    />
  );
};

export default AdminMemberSearchControls;