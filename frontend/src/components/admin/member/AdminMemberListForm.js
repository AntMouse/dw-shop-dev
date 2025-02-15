// components/admin/member/AdminMemberListForm.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminListForm from "../shared/list/AdminListForm";
import AdminMemberSearch from "./AdminMemberSearch";
import AdminMemberTable from "./AdminMemberTable";
import Pagination from "../../common/pagination/Pagination";

const AdminMemberListForm = ({
  filteredMembers = [],
  searchTerm,
  handleSearchChange,
  handleSearchSubmit,
  currentMembers,
  currentPage,
  totalPages,
  setCurrentPage,
  membersPerPage,
  handleMembersPerPageChange,
  handleEditClick,
  handleDeleteClickWrapper,
  useCustomStyles = false, // ✅ 공용 CSS 사용 여부 추가
  customClass = "", // ✅ 별도 스타일 클래스 추가
}) => {
  return (
    <AdminListForm
      title="회원 목록"
      searchComponent={
        <AdminMemberSearch
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          membersPerPage={membersPerPage}
          handleMembersPerPageChange={handleMembersPerPageChange}
          totalItems={filteredMembers.length}
        />
      }
      tableComponent={
        <AdminMemberTable 
          currentMembers={currentMembers}
          handleEditClick={handleEditClick}
          handleDeleteClickWrapper={handleDeleteClickWrapper}
        />
      }
      paginationComponent={
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      }
      enabledFeatures={["search", "table", "pagination"]} // ✅ 기본적으로 모든 기능을 활성화
      useCustomStyles={useCustomStyles} // ✅ 공용 CSS 사용 여부 전달
      customClass={customClass} // ✅ 별도 스타일 적용 가능
    />
  );
};

export default AdminMemberListForm;
