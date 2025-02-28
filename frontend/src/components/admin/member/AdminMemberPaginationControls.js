// components/admin/member/AdminMemberPaginationControls.js

// 1. React 기본 라이브러리
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminPaginationControls from "../shared/pagination/AdminPaginationControls";

const AdminMemberPaginationControls = ({
  memberCurrentPage,
  setMemberCurrentPage,
  membersPerPage,
  handleMembersPerPageChange,
  memberTotalPages,
  memberStartPage,
  memberEndPage,
  memberPerPageOptions,
  enabledFeatures,
  useCustomStyles,
  customClass,
}) => {
  return (
    <AdminPaginationControls
      currentPage={memberCurrentPage}
      setCurrentPage={setMemberCurrentPage}
      perPage={membersPerPage}
      handlePerPageChange={handleMembersPerPageChange}
      totalPages={memberTotalPages}
      startPage={memberStartPage}
      endPage={memberEndPage}
      perPageOptions={memberPerPageOptions}
      enabledFeatures={enabledFeatures}
      useCustomStyles={useCustomStyles}
      customClass={customClass}
    />
  );
};

export default AdminMemberPaginationControls;
