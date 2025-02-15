// components/admin/member/AdminMemberSearch.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import SearchComponent from "../../common/search/SearchComponent";
import PaginationControls from "../../common/pagination/PaginationControls";

const AdminMemberSearch = ({
  searchTerm,
  handleSearchChange,
  handleSearchSubmit,
  membersPerPage,
  handleMembersPerPageChange,
  totalItems,
  useCustomStyles = false, 
  customClass = "", 
  enabledFeatures = ["searchComponent", "paginationControls"], // ✅ 기능 활성화 옵션 추가
}) => { 
  return (
    <div className="member-list-page-controls">
      <div className="member-count">총 {totalItems}명</div>
      <div className="member-count2">
      <SearchComponent
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        useCustomStyles={useCustomStyles}
        customClass={customClass}
        enabledFeatures={enabledFeatures.includes("searchComponent") ? ["searchComponent"] : []} // ✅ searchComponent만 전달
      />
      <PaginationControls
        itemsPerPage={membersPerPage}
        handleItemsPerPageChange={handleMembersPerPageChange}
        totalItems={totalItems}
        useCustomStyles={useCustomStyles}
        customClass={customClass}
        enabledFeatures={enabledFeatures.includes("paginationControls") ? ["paginationControls"] : []} // ✅ paginationControls만 전달
      />
      </div>
    </div>
  );
};

export default AdminMemberSearch;
