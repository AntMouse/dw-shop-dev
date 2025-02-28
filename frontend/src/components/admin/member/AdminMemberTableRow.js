// components/admin/member/AdminMemberTableRow.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminTableRow from "../shared/table/AdminTableRow";
import { maskPhoneNumber } from "../../../utils/string/maskUtils"; // ✅ 유틸리티 함수 임포트

const AdminMemberTableRow = ({
  member,
  index,
  editMemberId,
  editMemberData,
  handleInputChange,
  handleSaveClickWrapper,
  handleCancelClickWrapper,
  handleEditClick,
  handleDeleteMember,
  useCustomStyles = false,
  customClass = "",
  enabledFeatures,
}) => {
  const isEditing = editMemberId === member.id;

  // ✅ 마스킹 적용
  const processedMemberData = {
    ...member,
    contact: maskPhoneNumber(member.contact), // ✅ 전화번호만 마스킹 적용
  };

  return (
    <AdminTableRow
      rowData={isEditing ? editMemberData : processedMemberData} // ✅ 마스킹된 데이터 전달
      fields={[
        { key: "memberId", label: "아이디" },
        { key: "memberName", label: "이름" },
        { key: "email", label: "이메일" },
        { key: "contact", label: "전화번호" }, // ✅ 전화번호는 마스킹된 값으로 적용
      ]}
      index={index}
      onInputChange={handleInputChange}
      onSave={handleSaveClickWrapper}
      onCancel={handleCancelClickWrapper}
      onEdit={() => handleEditClick(member.id)}
      onDelete={handleDeleteMember}
      isEditing={isEditing}
      useCustomStyles={useCustomStyles}
      customClass={customClass}
      enabledFeatures={enabledFeatures}
    />
  );
};

export default AdminMemberTableRow;