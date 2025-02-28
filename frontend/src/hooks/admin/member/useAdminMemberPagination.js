// hooks/admin/member/useAdminMemberPagination.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import { useAdminPagination } from "../shared/useAdminPagination"; // ✅ 공용 페이지네이션 훅 가져오기

export const useAdminMemberPagination = (filteredMembers) => {
  const result = useAdminPagination(filteredMembers, [10, 20, 50, 100]); // ✅ 기본 회원 페이지당 항목 수 20개

  return {
    memberCurrentPage: result.currentPage,
    setMemberCurrentPage: result.setCurrentPage,
    membersPerPage: result.itemsPerPage,
    setMembersPerPage: result.setItemsPerPage,
    memberTotalPages: result.totalPages,
    memberStartPage: result.startPage,
    memberEndPage: result.endPage,
    memberPerPageOptions: result.perPageOptions,
    handleMembersPerPageChange: result.handleItemsPerPageChange,
    currentMembers: result.currentItems,
  };
};