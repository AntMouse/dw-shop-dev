// hooks/admin/member/useAdminMemberPagination.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import { useState } from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { calculateTotalPages } from "../../../utils/pagination/paginationUtils";

export const useAdminMemberPagination = (filteredMembers) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(20);

  const totalPages = calculateTotalPages(filteredMembers?.length || 0, membersPerPage); // ✅ 방어 코드 추가

  const handleMembersPerPageChange = (event) => {
    const value = Number(event.target.value);
    if (isNaN(value) || value <= 0) return; // ✅ 잘못된 값 방지
    setMembersPerPage(value);
    setCurrentPage(1);
  };
  
  return {
    currentPage,
    setCurrentPage,
    membersPerPage,
    setMembersPerPage,
    totalPages,
    handleMembersPerPageChange,
  };
};
