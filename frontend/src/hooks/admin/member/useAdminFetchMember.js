// hooks/admin/member/useAdminFetchMember.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminFetchItem } from "../shared/useAdminFetchItem";
import { getMemberById } from "../../../services/member/memberService";
import { maskPhoneNumber } from "../../../utils/string/maskUtils";
import { DEFAULT_MEMBER_DATA } from "../../../constants/member/memberConstants";

export const useAdminFetchMember = (onError) => {
  return useAdminFetchItem(
    getMemberById,
    DEFAULT_MEMBER_DATA,
    (data) => ({
      ...data,
      contact: maskPhoneNumber(data.contact),
    }),
    onError
  );
};
