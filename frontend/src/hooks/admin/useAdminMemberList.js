// hooks/admin/useAdminMemberList.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminFetchList } from "./shared/useAdminFetchList";  
import { getMemberList } from "../../services/member/memberService";
import { useAdminMemberSort } from "./useAdminMemberSort";

export const useAdminMemberList = (onError) => {
  const { getSortedMembers } = useAdminMemberSort();
  return useAdminFetchList(getMemberList, getSortedMembers, onError);
};