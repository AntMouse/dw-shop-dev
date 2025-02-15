// components/admin/member/AdminMemberListPage.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 2. 외부 라이브러리
import { useNavigate } from "react-router-dom";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminFetchMemberList } from "../../../hooks/admin/member/useAdminFetchMemberList";
import { useAdminMemberPagination } from "../../../hooks/admin/member/useAdminMemberPagination";
import { useAdminMemberHandlers } from "../../../hooks/admin/member/useAdminMemberHandlers";
import { useSearch } from "../../../hooks/search/useSearch";
import AdminMemberListForm from "./AdminMemberListForm";
import { navigateToAdminPage } from "../../../utils/navigation/adminNavigation";

function AdminMemberListPage() {
  const navigate = useNavigate();
  const { members, filteredMembers, setMembers, setFilteredMembers } = useAdminFetchMemberList(); 
  const { currentPage, setCurrentPage, membersPerPage, totalPages, handleMembersPerPageChange } = useAdminMemberPagination(filteredMembers);
  const { handleDeleteClick } = useAdminMemberHandlers(setMembers);
  const { searchTerm, handleSearchChange, handleSearchSubmit } = useSearch(
    members,
    (member, searchTerm) => member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminMemberListForm
      filteredMembers={filteredMembers || []}
      searchTerm={searchTerm}
      handleSearchChange={handleSearchChange}
      handleSearchSubmit={() => setFilteredMembers(handleSearchSubmit())}
      currentMembers={filteredMembers?.slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage) || []}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      membersPerPage={membersPerPage}
      handleMembersPerPageChange={handleMembersPerPageChange}
      handleEditClick={(memberId) => navigateToAdminPage(navigate, "memberEdit", memberId)}
      handleDeleteClickWrapper={handleDeleteClick}
    />
  );
}

export default AdminMemberListPage;
