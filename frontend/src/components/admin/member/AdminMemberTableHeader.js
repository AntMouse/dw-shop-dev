// components/admin/member/AdminMemberTableHeader.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminTableHeader from "../shared/table/AdminTableHeader"; // ✅ 범용 테이블 헤더 사용
import AdminMemberTableRow from "./AdminMemberTableRow"; // ✅ 개별 회원 정보 행 사용

// 5. CSS 또는 스타일 파일
import styles from "./styles/AdminMemberTable.module.css";

const AdminMemberTableHeader = ({
  currentMembers = [],
  editMemberId,
  editMemberData,
  handleInputChange,
  handleKeyDown,
  handleSaveClickWrapper,
  handleCancelClickWrapper,
  handleEditClick,
  handleDeleteMember,
  enabledFeatures,
  useCustomStyles = false,
  customClass = "",
}) => {
  // ✅ 테이블 컬럼 정의
  const memberTableColumns = ["아이디", "이름", "이메일", "전화번호", "관리"];

  return (
    <table className={styles.table}>
      <AdminTableHeader 
        columns={memberTableColumns} 
        enabledFeatures={enabledFeatures.includes("tableHeader") ? ["tableHeader"] : []}
        useCustomStyles={useCustomStyles} // ✅ 공용 CSS 사용 여부 전달
        customClass={customClass} // ✅ 별도 스타일 적용 가능
      />
      <tbody>
        {Array.isArray(currentMembers) && currentMembers.length > 0 ? ( // ✅ 리스트가 있을 때만 렌더링
          currentMembers.map((member, index) => (
            <AdminMemberTableRow
              key={member.id}
              member={member}
              index={index}
              editMemberId={editMemberId}
              editMemberData={editMemberData}
              handleInputChange={handleInputChange}
              handleKeyDown={handleKeyDown}
              handleSaveClickWrapper={handleSaveClickWrapper}
              handleCancelClickWrapper={handleCancelClickWrapper}
              handleEditClick={handleEditClick}
              handleDeleteMember={handleDeleteMember}
              enabledFeatures={enabledFeatures.includes("tableRow") || enabledFeatures.includes("tableActions") 
                ? ["tableRow", "tableActions"].filter(feature => enabledFeatures.includes(feature)) 
                : []} // ✅ 필요한 값만 선별하여 전달
            />
          ))
        ) : (
          <tr>
            <td colSpan={memberTableColumns.length} className={styles.emptyRow}>
              데이터가 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AdminMemberTableHeader;