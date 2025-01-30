// components/admin/member/AdminMemberEditForm.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from 'react';

// 5. CSS 또는 스타일 파일
import './styles/AdminMemberEditForm.css'

const AdminMemberEditForm = ({ editMemberData, handleInputChange, handleSaveClick, handleCancelClick }) => {
  const baseClass = "member-edit-form"; // 클래스명 변수 선언

  return (
    <div className={`${baseClass}-container`}>
      <h1>회원 정보</h1>
      <div className={baseClass}>
        <label>회원 타입</label>
        <select
          className={`${baseClass}-input`}
          value={editMemberData.memberType}
          onChange={(e) => handleInputChange(e, 'memberType')}
        >
          <option value="USER">일반 회원</option>
          <option value="ADMIN">관리자</option>
        </select>

        <label>아이디</label>
        <input type="text" className={`${baseClass}-input`} value={editMemberData.memberId} disabled />

        <label>이름</label>
        <input type="text" className={`${baseClass}-input`} value={editMemberData.memberName} disabled />

        <label>생년월일</label>
        <input type="date" className={`${baseClass}-input`} value={editMemberData.birthdate} disabled />

        <label>성별</label>
        <select className={`${baseClass}-input`} value={editMemberData.gender} disabled>
          <option value="Male">남자</option>
          <option value="Female">여자</option>
        </select>

        <label>이메일</label>
        <input type="email" className={`${baseClass}-input`} value={editMemberData.email} disabled />

        <label>전화번호</label>
        <input type="text" className={`${baseClass}-input`} value={editMemberData.contact} disabled />

        <div className={`${baseClass}-buttons`}>
          <button onClick={handleSaveClick}>저장</button>
          <button onClick={handleCancelClick}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default AdminMemberEditForm;
