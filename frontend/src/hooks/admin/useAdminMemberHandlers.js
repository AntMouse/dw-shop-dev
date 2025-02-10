// hooks/admin/useAdminMemberHandlers.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import { useState } from "react";

// 2. 외부 라이브러리
import { useNavigate } from "react-router-dom";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { getMemberList, getMemberById, updateMember, deleteMember } from "../../services/member/memberService";
import { useMemberSort } from "./useAdminMemberSort";
import { navigateToAdminPage } from "../../utils/navigation/adminNavigation";

export const useAdminMemberHandlers = (setMembers, setDisplayedMemberCount, setShowMembers, setCurrentPage) => {
  const { getSortedMembers } = useMemberSort();
  const [editMemberId, setEditMemberId] = useState(null);
  const [editMemberData, setEditMemberData] = useState(null);
  const navigate = useNavigate();

  // ✅ 회원 목록 새로고침 핸들러 (onError 콜백 추가)
  const handleShowMembersClick = async (onError) => {
    try {
      const members = await getMemberList();
      if (!Array.isArray(members) || members.length === 0) {
        if (onError) onError("불러온 회원 목록이 없습니다.");
        setMembers([]);
        setDisplayedMemberCount(0);
        return;
      }
      setMembers(members);
      setDisplayedMemberCount(getSortedMembers(members, null).length);
      setShowMembers(true);
      setCurrentPage(1);
    } catch (error) {
      if (onError) onError(`회원 목록을 불러오는 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const handleShowMemberDetailClick = async (memberId, onError) => {
    try {
      const member = await getMemberById(memberId);
      if (!member) {
        if (onError) onError("회원 정보를 불러올 수 없습니다.");
        return;
      }
      setEditMemberData(member);
    } catch (error) {
      if (onError) onError(`회원 정보를 불러오는 중 오류가 발생했습니다: ${error.message}`);
    }
  };
  

  // ✅ 저장 핸들러 (onError 콜백 추가)
  const handleSaveClick = async (onSuccess, onError) => {
    if (!editMemberData?.memberId || !editMemberData?.memberName || !editMemberData?.email || !editMemberData?.contact) {
      if (onError) onError("모든 필드를 입력해야 합니다.");
      return;
    }

    try {
      await updateMember(editMemberId, editMemberData);
      await handleShowMembersClick(onError);
      setEditMemberId(null);
      setEditMemberData(null);
      if (onSuccess) onSuccess("성공적으로 저장되었습니다.");
    } catch (error) {
      if (onError) onError("회원 정보를 저장하는 중 오류가 발생했습니다.");
    }
  };

  // ✅ 취소 핸들러
  const handleCancelClick = () => {
    setEditMemberId(null);
    setEditMemberData(null);
  };

  // ✅ 삭제 핸들러 (onError, onSuccess 콜백 추가)
  const handleDeleteClick = async (memberId, onSuccess, onError) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteMember(memberId);
        if (onSuccess) onSuccess("성공적으로 삭제되었습니다.");
      } catch (error) {
        if (onError) onError("회원 정보를 삭제하는 중 오류가 발생했습니다.");
      }
    }
  };

  // ✅ 수정 핸들러 (멤버 데이터 유효성 검사 추가)
  const handleEditClick = async (memberId, onError) => {
    try {
      const memberData = await getMemberById(memberId);
      if (!memberData) {
        if (onError) onError("회원 정보를 불러올 수 없습니다.");
        return;
      }
      setEditMemberData(memberData);
      setEditMemberId(memberId);
    } catch (error) {
      if (onError) onError("회원 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // ✅ 입력값 변경 핸들러
  const handleInputChange = (event, key) => {
    setEditMemberData((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  // ✅ 회원 상세 페이지로 이동하는 함수
  const handleNavigateToEditPage = (memberId) => {
    navigateToAdminPage(navigate, "memberEdit", memberId); // ✅ 기존 네비게이션 로직 활용
  };  

  return {
    editMemberId,
    editMemberData,
    handleShowMembersClick,
    handleShowMemberDetailClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
    handleEditClick,
    handleInputChange,
    handleNavigateToEditPage,
  };
};
