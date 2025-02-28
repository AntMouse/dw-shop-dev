// hooks/admin/member/useAdminMemberHandlers.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminHandlers } from "../shared/useAdminHandlers";
import { maskPhoneNumber } from "../../../utils/string/maskUtils";

export const useAdminMemberHandlers = (getMemberList, getMemberById, updateMember, deleteMember, onError) => {
  const result = useAdminHandlers(getMemberList, getMemberById, updateMember, deleteMember, onError);

  const maskedMembers = result.items.map((member) => ({
    ...member,
    contact: maskPhoneNumber(member.contact), // ✅ 전화번호 필드 마스킹 처리
  }));

  return {
    editMemberId: result.editItemId,  
    editMemberData: result.editItemData,
    members: maskedMembers,
    setMembers: result.setItems,
    handleFetchMemberList: result.fetchItemList,
    handleFetchMemberDetail: result.fetchItemDetail,
    handleUpdateMember: result.updateItem,
    handleDeleteMember: result.deleteItem,
    handleMemberUpdateInputValue: result.updateInputValue,
    handleMemberCancelEdit: result.cancelEdit,
  };
};