// hooks/admin/member/useAdminFetchMemberList.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminFetchList } from "../shared/useAdminFetchList";  
import { getMemberList } from "../../../services/member/memberService";
import { useAdminMemberSort } from "./useAdminMemberSort";

export const useAdminFetchMemberList = (onError) => {
  const { getSortedMembers } = useAdminMemberSort();
  const result = useAdminFetchList(getMemberList, getSortedMembers, onError);

    return {
    members: result.items,
    filteredMembers: result.filteredItems,
    setMembers: result.setItems,
    setFilteredMembers: result.setFilteredItems,
    fetchMembers: result.fetchItems,
    error: result.error,
    isLoading: result.isLoading,
  };
};
