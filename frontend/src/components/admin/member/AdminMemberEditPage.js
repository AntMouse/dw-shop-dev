// components/admin/member/AdminMemberEditPage.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import MemberEditForm from "./AdminMemberEditForm";
import { useFetchMember } from "../../../hooks/member/useFetchMember";
import { useEditMemberType } from "../../../hooks/member/useEditMemberType";

function AdminMemberEditPage() {
  const { member } = useFetchMember(); // 기본값 포함된 member 반환
  const { editMemberData, handleInputChange, handleSaveClick, handleCancelClick } = useEditMemberType(member); // 바로 사용 가능

  if (!member) {
    return <div>로딩 중...</div>;
  }

  return (
    <MemberEditForm
      editMemberData={editMemberData}
      handleInputChange={handleInputChange}
      handleSaveClick={handleSaveClick}
      handleCancelClick={handleCancelClick}
    />
  );
}

export default AdminMemberEditPage;