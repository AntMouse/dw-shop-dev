// components/admin/member/AdminMemberDetailForm.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from 'react';

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminDetailForm from '../shared/detail/AdminDetailForm';
import { MEMBER_FORM_FIELDS } from '../../../constants/member/memberFormFields';

const AdminMemberDetailForm = ({ 
  editMemberData, 
  handleInputChange, 
  handleSaveClick, 
  handleCancelClick,
  useCustomStyles = false, // ✅ 공용 CSS 사용 여부 추가
  customClass = "" // ✅ 별도 스타일 클래스 추가
}) => {
  const formFields = MEMBER_FORM_FIELDS.map((field) => ({
    ...field,
    disabled: ["memberId", "memberName", "birthdate", "gender", "email", "contact"].includes(field.key),
  }));

  const enabledFeatures = ["text", "select", "save", "cancel"]; 

  return (
    <AdminDetailForm
      title="회원 정보"
      formData={editMemberData}
      formFields={formFields}
      handleInputChange={handleInputChange}
      handleSaveClick={handleSaveClick}
      handleCancelClick={handleCancelClick}
      enabledFeatures={enabledFeatures}
      useCustomStyles={useCustomStyles} // ✅ 공용 CSS 사용 여부 전달
      customClass={customClass} // ✅ 별도 스타일 적용 가능
    />
  );
};

export default AdminMemberDetailForm;
