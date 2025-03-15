// components/admin/member/AdminMemberListPage.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React, { useEffect } from "react";

// 2. 외부 라이브러리
import { useNavigate } from "react-router-dom";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminMemberListForm from "./AdminMemberListForm";
import { memberSearchFieldsOptions, memberSearchPeriodOptions, getAllMemberSearchFields, memberSortCriteriaOptions  } from "../../../config/memberOptions";
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
    memberListUpdateTrigger,
    handleFetchMemberDetail,
    handleUpdateMember,
    handleDeleteMember,
    handleMemberUpdateInputValue,
    handleMemberCancelEdit,
  } = useAdminMemberHandlers(getMemberList, getMemberById, updateMember, deleteMember, alert);

  // 검색을 실행하면 데이터 요청 (memberConfirmedSearchTerm, memberSearchTrigger)
  // 페이지 이동하면 데이터 요청 (memberCurrentPage)
  useEffect(() => {
    handleFetchMemberList();
  }, [memberConfirmedSearchTerm, memberSearchTrigger, memberCurrentPage]);

  const {
    memberSearchTerm, 
    handleMemberSearchTermChange, 
    memberConfirmedSearchTerm,
    memberSearchTrigger,
    memberIsSearchExecuted,
    setMemberIsSearchExecuted,
    memberSearchResults,
    memberSearchResultsTrigger,
    memberSearchField, 
    handleMemberSearchFieldChange, 
    memberSelectedSearchPeriod, 
    handleMemberSearchPeriodChange,
    memberCustomStartDate,
    handleMemberCustomStartDateChange,
    memberCustomEndDate,
    handleMemberCustomEndDateChange,
    executeMemberSearch,
    handleMemberSearchSubmit,
    handleMemberSearchKeyPress
  } = useAdminMemberSearch(members, getAllMemberSearchFields());

  // 데이터 요청 끝나면 검색 실행
  useEffect(() => {
    executeMemberSearch();
  }, [members, memberListUpdateTrigger]);

  const { 
    memberSortCriteria, 
    handleMemberSortCriteriaChange, 
    memberSortDirection,
    handleMemberSortDirectionChange, 
    sortedMembers,
    sortedMembersTrigger,
    executeMemberSort
  } = useAdminMemberSort(memberSearchResults);

  // 정렬 기준, 방향을 바꿀 때마다 정렬 기능 다시 실행
  // 검색 완료 후에도 정렬 기능 다시 실행
  useEffect(() => {
    executeMemberSort();
  }, [memberSearchResults, memberSearchResultsTrigger, memberSortCriteria, memberSortDirection]);
  
  const { 
    memberCurrentPage, 
    setMemberCurrentPage, 
    membersPerPage, 
    setMembersPerPage,
    memberPageGroup,
    setMemberPageGroup,
    currentPageMembers,
    memberTotalPages, 
    memberStartPage,
    memberEndPage, 
    memberPerPageOptions,
    handleMembersPerPageChange,
    handleMemberPageNavigation
  } = useAdminMemberPagination(sortedMembers, [5, 10, 20, 50]);

  // ✅ 정렬이 끝난 후 페이징 기능을 다시 실행하도록 트리거 추가
  // 그런데 페이징은 정렬 데이터가 변경이 되면 어떤 작업을 해야 할까?
  useEffect(() => {
    setMemberCurrentPage(1);
  }, [sortedMembers, sortedMembersTrigger]);  

  // 검색을 하면 1페이지로 이동
  // [] 안의 내용 수정 예정. 지금 들어간 값은 빼고 다른 걸로 바꿀 것이다.
  // 검색 작업이 끝나면 유즈 이펙트 실행으로 정렬 작업이 실행. 그 이후 정렬 값 리턴.
  // 정렬 값이 변하면 페이징에서 또 유즈 이펙트로 페이징 기능 다시 정비.
  // 페이징 기능 정비가 끝나면 그걸 인식해서 이제 1페이지로 이동한다.
  useEffect(() => {
    if (memberIsSearchExecuted) {
      setMemberIsSearchExecuted(false);
      setMemberCurrentPage(1);
    };
  }, [memberSearchResults, memberSearchResultsTrigger]); 

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
      memberConfirmedSearchTerm={memberConfirmedSearchTerm}
      memberSearchResults={memberSearchResults} 
      memberSearchField={memberSearchField}
      handleMemberSearchFieldChange={handleMemberSearchFieldChange}
      memberSelectedSearchPeriod={memberSelectedSearchPeriod}
      handleMemberSearchPeriodChange={handleMemberSearchPeriodChange}
      memberCustomStartDate={memberCustomStartDate}
      handleMemberCustomStartDateChange={handleMemberCustomStartDateChange}
      memberCustomEndDate={memberCustomEndDate}
      handleMemberCustomEndDateChange={handleMemberCustomEndDateChange}
      handleMemberSearchSubmit={handleMemberSearchSubmit}
      handleMemberSearchKeyPress={handleMemberSearchKeyPress}

      // 2-3. 정렬 데이터
      memberSortCriteria={memberSortCriteria}
      handleMemberSortCriteriaChange={handleMemberSortCriteriaChange}
      memberSortDirection={memberSortDirection}
      handleMemberSortDirectionChange={handleMemberSortDirectionChange}
      executeMemberSort={executeMemberSort}

      // 2-4. 페이지네이션 데이터
      memberCurrentPage={memberCurrentPage}
      setMemberCurrentPage={setMemberCurrentPage}
      membersPerPage={membersPerPage}
      setMembersPerPage={setMembersPerPage}
      memberPageGroup={memberPageGroup}
      setMemberPageGroup={setMemberPageGroup}
      currentPageMembers={currentPageMembers}
      memberTotalPages={memberTotalPages}
      memberStartPage={memberStartPage}
      memberEndPage={memberEndPage}
      memberPerPageOptions={memberPerPageOptions}
      handleMembersPerPageChange={handleMembersPerPageChange}
      handleMemberPageNavigation={handleMemberPageNavigation}

      handleEditClick={(memberId) => navigateToAdminPage(navigate, "memberEdit", memberId)}
    />
  );
}

export default AdminMemberListPage;