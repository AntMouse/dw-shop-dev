// components/admin/member/AdminMemberEditPage.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 2. 외부 라이브러리
import { useParams } from "react-router-dom"; 

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import MemberEditForm from "./AdminMemberEditForm";
import { useFetchMember } from "../../../hooks/member/useFetchMember";
import { useEditMemberType } from "../../../hooks/member/useEditMemberType";

function AdminMemberEditPage() {
  const { id } = useParams();
  const { member } = useFetchMember(id);
  const { editMemberData, handleInputChange, handleSaveClick, handleCancelClick } = useEditMemberType(member); // 바로 사용 가능

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