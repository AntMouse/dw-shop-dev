// hooks/admin/member/useAdminMemberSort.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminSort } from "../shared/useAdminSort";

export const useAdminMemberSort = (members) => {
  const result = useAdminSort(members, "memberId", "asc"); // ✅ 기본값 설정

  return {
    memberSortCriteria: result.sortCriteria, 
    handleMemberSortCriteriaChange: result.handleSortCriteriaChange, 
    memberSortDirection: result.sortDirection, 
    handleMemberSortDirectionChange: result.handleSortDirectionChange, 
    sortedMembers: result.sortedItems,
  };
};