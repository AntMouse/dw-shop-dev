// hooks/admin/useAdminEditMemberType.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminEditType } from "./shared/useAdminEditType";
import { updateMemberType } from "../../services/member/memberService";
import { DEFAULT_MEMBER_DATA } from "../../constants/member/memberConstants";

export const useAdminEditMemberType = (initialData, onError) => {
  return useAdminEditType(updateMemberType, initialData || DEFAULT_MEMBER_DATA, "memberList", onError);
};