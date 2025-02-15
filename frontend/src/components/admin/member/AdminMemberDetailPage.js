// components/admin/member/AdminMemberDetailPage.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 2. 외부 라이브러리
import { useNavigate } from "react-router-dom"; 

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminMemberEditForm from "./AdminMemberDetailForm";
import { useAdminFetchMember } from "../../../hooks/admin/member/useAdminFetchMember";
import { useAdminMemberHandlers } from "../../../hooks/admin/member/useAdminMemberHandlers";
import { navigateToAdminPage } from "../../../utils/navigation/adminNavigation";
import { updateMemberType } from "../../../services/member/memberService";

function AdminMemberDetailPage() {
  const navigate = useNavigate();
  const { item: editMemberData } = useAdminFetchMember();
  const { handleInputChange, handleSaveClick } = useAdminMemberHandlers();

  return (
    <AdminMemberEditForm
      editMemberData={editMemberData}
      handleInputChange={handleInputChange}
      handleSaveClick={() =>
        handleSaveClick(
          (id, data) => updateMemberType(id, data.memberType),
          ["memberType"],
          (message) => alert(message),
          (errorMessage) => alert(errorMessage),
          editMemberData.id,
          editMemberData
        )
      }      
      handleCancelClick={() => navigateToAdminPage(navigate, "memberList")}
    />
  );
}

export default AdminMemberDetailPage;
