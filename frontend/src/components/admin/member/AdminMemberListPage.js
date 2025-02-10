// components/admin/member/AdminMemberListPage.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React, { useEffect } from "react"; // useEffect 이건 임시로 추가한 것.
// 따라서 위의 것은 아래를 적용한다.
// 이 코드는 에러가 해결 되면 삭제

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminMemberList } from "../../../hooks/admin/useAdminMemberList";
import { useMemberPagination } from "../../../hooks/admin/useAdminMemberPagination";
import { useMemberHandlers } from "../../../hooks/admin/useAdminMemberHandlers";
import { useSearch } from "../../../hooks/search/useSearch";
import AdminMemberListForm from "./AdminMemberListForm";

function AdminMemberListPage() {
  const { members, filteredMembers, setMembers, setFilteredMembers, isLoading } = useAdminMemberList(); 
  // 위 코드에서 마지막에 있는 isLoading는 오류 검사를 위해 추가한 것. 따라서 아래 적용.
  // 이 코드는 에러가 해결 되면 삭제
  const { currentPage, setCurrentPage, membersPerPage, totalPages, handleMembersPerPageChange } =
    useMemberPagination(filteredMembers);
  const { handleEditAndNavigate, handleDeleteClick } = useMemberHandlers(setMembers);
  const { searchTerm, handleSearchChange, handleSearchSubmit } = useSearch(
    members,
    (member, searchTerm) => member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // 이 코드는 에러가 해결 되면 삭제
    // 아래 useEffect 부분 전체 삭제.
    // ✅ 데이터 초기 로드 확인용 로그 추가
    useEffect(() => {
      if (!isLoading) {
        console.log("1️⃣ useEffect - members:", members);
        console.log("1️⃣ useEffect - filteredMembers:", filteredMembers);
      }
    }, [isLoading, members, filteredMembers]); // 의존성 배열에 members, filteredMembers 추가

  return (
    <AdminMemberListForm
      filteredMembers={filteredMembers}
      searchTerm={searchTerm}
      handleSearchChange={handleSearchChange}
      handleSearchSubmit={() => setFilteredMembers(handleSearchSubmit())}
      currentMembers={filteredMembers.slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage)}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      membersPerPage={membersPerPage}
      handleMembersPerPageChange={handleMembersPerPageChange}
      handleEditClick={(memberId) => {
        console.log("📌 AdminMemberListPage - members:", members);
        handleEditAndNavigate(memberId, members);
      }} 
      handleDeleteClickWrapper={handleDeleteClick}
    />
  );
}

export default AdminMemberListPage;
