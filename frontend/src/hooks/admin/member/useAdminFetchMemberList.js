// hooks/admin/member/useAdminFetchMemberList.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminFetchList } from "../shared/useAdminFetchList";  

export const useAdminFetchMemberList = (fetchMemberList, onError) => {
  const result = useAdminFetchList(fetchMemberList, onError);

  return {
    members: result.items,
    setMembers: result.setItems,
    fetchMembers: result.fetchItems,
    error: result.error,
    isLoading: result.isLoading,
  };
};