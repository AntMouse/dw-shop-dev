// components/admin/member/AdminMemberListPage.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React, { useEffect } from "react";

// 2. 외부 라이브러리
import { useNavigate } from "react-router-dom";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminMemberListForm from "./AdminMemberListForm";
import { memberSearchFieldsOptions, memberSearchPeriodOptions, memberSortCriteriaOptions } from "../../../config/memberOptions";
import { memberTableColumns, memberFields } from "../../../config/memberTableConfig";

import { getMemberList, getMemberById, updateMember, deleteMember } from "../../../services/member/memberService";

import { useAdminMemberHandlers } from "../../../hooks/admin/member/useAdminMemberHandlers";
import { useAdminMemberSearch } from "../../../hooks/admin/member/useAdminMemberSearch";
import { useAdminMemberSort } from "../../../hooks/admin/member/useAdminMemberSort";
import { useAdminMemberPagination } from "../../../hooks/admin/member/useAdminMemberPagination";

import { navigateToAdminPage } from "../../../utils/navigation/adminNavigation";

function AdminMemberListPage() {
  const navigate = useNavigate();

  const {
    editMemberId, 
    editMemberData,
    members,
    handleFetchMemberList,
    handleFetchMemberDetail,
    handleUpdateMember,
    handleDeleteMember,
    handleMemberUpdateInputValue,
    handleMemberCancelEdit,
  } = useAdminMemberHandlers(getMemberList, getMemberById, updateMember, deleteMember, alert);

  const {
    memberSearchTerm, 
    handleMemberSearchTermChange, 
    memberSearchField, 
    handleMemberSearchFieldChange, 
    memberSelectedSearchPeriod, 
    handleMemberSearchPeriodChange, 
    memberSearchFilters, 
    handleMemberSearchFilterChange, 
    getMemberSearchResults,
    handleMemberSearchKeyPress,
    handleMemberSearchSubmit
  } = useAdminMemberSearch(members);
  const searchedMembers = getMemberSearchResults();

  const { 
    memberSortCriteria, 
    handleMemberSortCriteriaChange, 
    memberSortDirection, 
    handleMemberSortDirectionChange, 
    sortedMembers 
  } = useAdminMemberSort(searchedMembers);

  const { 
    memberCurrentPage, 
    setMemberCurrentPage, 
    membersPerPage, 
    handleMembersPerPageChange, 
    memberTotalPages, 
    memberStartPage, 
    memberEndPage, 
    memberPerPageOptions,
    currentMembers
  } = useAdminMemberPagination(sortedMembers);

  useEffect(() => {
    handleFetchMemberList();
  }, [memberCurrentPage]);

  return (
    <AdminMemberListForm
      // 1. UI 옵션 및 테이블 데이터
      memberTableColumns={memberTableColumns}
      memberFields={memberFields}
      memberSearchFieldsOptions={memberSearchFieldsOptions}
      memberSearchPeriodOptions={memberSearchPeriodOptions}
      memberSortCriteriaOptions={memberSortCriteriaOptions}

      // 2. 데이터
      // 2-1. 핸들러 데이터
      editMemberId={editMemberId}
      editMemberData={editMemberData}    
      handleFetchMemberList={handleFetchMemberList}
      handleFetchMemberDetail={handleFetchMemberDetail}
      handleUpdateMember={handleUpdateMember}
      handleDeleteMember={handleDeleteMember}
      handleMemberUpdateInputValue={handleMemberUpdateInputValue}
      handleMemberCancelEdit={handleMemberCancelEdit}

      // 2-2. 검색 데이터
      memberSearchTerm={memberSearchTerm}
      handleMemberSearchTermChange={handleMemberSearchTermChange}
      memberSearchField={memberSearchField}
      handleMemberSearchFieldChange={handleMemberSearchFieldChange}
      memberSelectedSearchPeriod={memberSelectedSearchPeriod}
      handleMemberSearchPeriodChange={handleMemberSearchPeriodChange}
      memberSearchFilters={memberSearchFilters}
      handleMemberSearchFilterChange={handleMemberSearchFilterChange}
      getMemberSearchResults={getMemberSearchResults}
      handleMemberSearchKeyPress={handleMemberSearchKeyPress}
      handleMemberSearchSubmit={handleMemberSearchSubmit}

      // 2-3. 정렬 데이터
      memberSortCriteria={memberSortCriteria}
      handleMemberSortCriteriaChange={handleMemberSortCriteriaChange}
      memberSortDirection={memberSortDirection}
      handleMemberSortDirectionChange={handleMemberSortDirectionChange}

      // 2-4. 페이지네이션 데이터
      memberCurrentPage={memberCurrentPage}
      setMemberCurrentPage={setMemberCurrentPage}
      membersPerPage={membersPerPage}
      handleMembersPerPageChange={handleMembersPerPageChange}
      memberTotalPages={memberTotalPages}
      memberStartPage={memberStartPage}
      memberEndPage={memberEndPage}
      memberPerPageOptions={memberPerPageOptions}
      currentMembers={currentMembers}

      handleEditClick={(memberId) => navigateToAdminPage(navigate, "memberEdit", memberId)}
    />
  );
}

export default AdminMemberListPage;