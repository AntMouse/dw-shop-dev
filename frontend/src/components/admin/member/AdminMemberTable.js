// components/admin/member/AdminMemberTable.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import TableHeader from "../../common/table/TableHeader"; // ✅ 범용 테이블 헤더 사용
import AdminMemberTableRow from "./AdminMemberTableRow"; // ✅ 개별 회원 정보 행 사용

// 5. CSS 또는 스타일 파일
import styles from "./styles/AdminMemberTable.module.css";

const AdminMemberTable = ({
  currentMembers = [],
  editMemberId,
  editMemberData,
  handleInputChange,
  handleKeyDown,
  handleSaveClickWrapper,
  handleCancelClickWrapper,
  handleEditClick,
  handleDeleteClickWrapper, // ✅ 삭제 기능 추가
  useCustomStyles = false, // ✅ 공용 CSS 사용 여부 추가
  customClass = "", // ✅ 별도 스타일 클래스 추가
  enabledFeatures = ["tableHeader", "tableBody"], // ✅ 기본적으로 테이블 헤더 및 바디 활성화
}) => {
  // ✅ 테이블 컬럼 정의
  const memberTableColumns = ["아이디", "이름", "이메일", "전화번호", "관리"];

  console.log("3️⃣ AdminMemberTable - currentMembers:", currentMembers); // 이 코드는 에러가 해결 되면 삭제

  return (
    <table className={styles.table}>
      <TableHeader 
        columns={memberTableColumns} 
        useCustomStyles={useCustomStyles} // ✅ 공용 CSS 사용 여부 전달
        customClass={customClass} // ✅ 별도 스타일 적용 가능
        enabledFeatures={enabledFeatures.includes("tableHeader") ? ["tableHeader"] : []} // ✅ 기능 활성화 전달
      />
      {enabledFeatures.includes("tableBody") && (
        <tbody>
          {Array.isArray(currentMembers) && currentMembers.length > 0 ? ( // 방어 로직 추가
            currentMembers.map((member) => {
              console.log("3️⃣ AdminMemberTable - Member Data:", member);
              return (
                <AdminMemberTableRow
                  key={member.id}
                  member={member}
                  editMemberId={editMemberId}
                  editMemberData={editMemberData}
                  handleInputChange={handleInputChange}
                  handleKeyDown={handleKeyDown}
                  handleSaveClickWrapper={handleSaveClickWrapper}
                  handleCancelClickWrapper={handleCancelClickWrapper}
                  handleEditClick={handleEditClick}
                  handleDeleteClickWrapper={handleDeleteClickWrapper}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={memberTableColumns.length} className={styles.emptyRow}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      )}
    </table>
  );
};

export default AdminMemberTable;