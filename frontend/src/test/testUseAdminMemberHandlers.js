// test/testUseAdminMemberHandlers.js

// 1. React 기본 라이브러리
import { useState } from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import {
  refreshList,
  refreshDetail,
  saveData,
  deleteData,
  editItem,
  updateInputValue,
  cancelEdit,
} from "../shared/useAdminHandlers";
import { getMemberList, getMemberById, deleteMember } from "../../../services/member/memberService";

export const useAdminMemberHandlers = (setMembers, setDisplayedMemberCount, setShowMembers, setCurrentPage, getSortedMembers) => {
  const [editMemberId, setEditMemberId] = useState(null);
  const [editMemberData, setEditMemberData] = useState(null);

  return {
    editMemberId,
    editMemberData,

    // ✅ 회원 목록 새로고침 (정렬 포함)
    handleMemberRefreshList: (onError) =>
      refreshList(getMemberList, setMembers, setDisplayedMemberCount, setShowMembers, setCurrentPage, getSortedMembers, onError),

    // ✅ 회원 상세 정보 새로고침
    handleMemberRefreshDetail: (memberId, onError) =>
      refreshDetail(getMemberById, memberId, setEditMemberData, onError),

    // ✅ 회원 저장 handleSaveClick
    handleMemberSaveData: (updateFunction, requiredFields, onSuccess, onError) =>
      saveData(
        updateFunction,
        editMemberId,
        editMemberData,
        requiredFields,
        () => refreshList(getMemberList, setMembers, setDisplayedMemberCount, setShowMembers, setCurrentPage, getSortedMembers, onError),
        setEditMemberId,
        setEditMemberData,
        onSuccess,
        onError
      ),

    // ✅ 회원 삭제 handleDeleteClick
    handleMemberDeleteData: (memberId, onSuccess, onError) =>
      deleteData(deleteMember, memberId, onSuccess, onError),        

    // ✅ 회원 정보 수정
    handleEditMember: (memberId, onError) =>
      editItem(getMemberById, memberId, setEditMemberData, setEditMemberId, onError),

    // ✅ 입력값 변경 handleInputChange
    handleMemberUpdateInputValue: (event, key) =>
      updateInputValue(event, key, setEditMemberData),

    // ✅ 취소 핸들러
    handleMemberCancelEdit: () =>
      cancelEdit(setEditMemberId, setEditMemberData),
  };
};
