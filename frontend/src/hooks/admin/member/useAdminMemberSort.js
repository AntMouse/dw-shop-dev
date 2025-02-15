// hooks/admin/member/useAdminMemberSort.js

// 1. React 기본 라이브러리
import { useState } from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { getFilteredAndSortedItems } from "../../../utils/sort/sortUtils";

export const useAdminMemberSort = () => {
  const [sortCriteria, setSortCriteria] = useState("default");
  const [sortDirection, setSortDirection] = useState("asc");

  const getSortedMembers = (members, filterCriteria = null) => {
    const criteria = sortCriteria === "default" ? "memberName" : sortCriteria; // ✅ "default" 처리
    return getFilteredAndSortedItems(members, filterCriteria, criteria, sortDirection);
  };  

  return {
    sortCriteria,
    setSortCriteria,
    sortDirection,
    setSortDirection,
    getSortedMembers,
  };
};