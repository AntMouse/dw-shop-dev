// components/admin/member/AdminMemberListForm.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminListForm from "../shared/list/AdminListForm";
import AdminMemberSearchControls from "./AdminMemberSearchControls";
import AdminMemberSortControls from "./AdminMemberSortControls";
import AdminMemberPaginationControls from "./AdminMemberPaginationControls";
import AdminMemberTable from "./AdminMemberTable";

const AdminMemberListForm = ({
  // 1. UI 옵션 및 테이블 데이터
  memberTableColumns,
  memberFields,
  memberSearchFieldsOptions,
  memberSearchPeriodOptions,
  memberSortCriteriaOptions,

  // 2. 데이터
  // 2-1. 핸들러 데이터
  editMemberId,
  editMemberData,
  handleFetchMemberList,
  handleFetchMemberDetail,
  handleUpdateMember,
  handleDeleteMember,
  handleMemberUpdateInputValue,
  handleMemberCancelEdit,

  // 2-2. 검색 데이터
  memberSearchTerm, 
  handleMemberSearchTermChange, 
  memberSearchField, 
  handleMemberSearchFieldChange, 
  memberSelectedSearchPeriod, 
  handleMemberSearchPeriodChange, 
  memberCustomStartDate,
  handleMemberCustomStartDateChange,
  memberCustomEndDate,
  handleMemberCustomEndDateChange,
  handleMemberSearchSubmit,  
  handleMemberSearchKeyPress,

  // 2-3. 정렬 데이터
  memberSortCriteria,
  handleMemberSortCriteriaChange,
  memberSortDirection,
  handleMemberSortDirectionChange,

  // 2-4. 페이지네이션 데이터
  memberCurrentPage,
  setMemberCurrentPage,
  membersPerPage,
  handleMembersPerPageChange,
  memberTotalPages,
  memberStartPage,
  memberEndPage,
  memberPerPageOptions,
  currentPageMembers,

  // 3. 기능 및 CSS 사용 여부
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  return (
    <AdminListForm
      title="회원 목록"

      enabledFeatures={["table", "search", "sort", "pagination"]}
      useCustomStyles={useCustomStyles} // ✅ 공용 CSS 사용 여부 전달
      customClass={customClass} // ✅ 별도 스타일 적용 가능

      tableComponent={
        <AdminMemberTable 
          editMemberId={editMemberId}
          editMemberData={editMemberData}   
          handleFetchMemberList={handleFetchMemberList}
          handleFetchMemberDetail={handleFetchMemberDetail} 
          handleUpdateMember={handleUpdateMember}     
          handleDeleteMember={handleDeleteMember}
          handleMemberUpdateInputValue={handleMemberUpdateInputValue}
          handleMemberCancelEdit={handleMemberCancelEdit}
          memberTableColumns={memberTableColumns}
          memberFields={memberFields}
          currentMembers={currentPageMembers}
          enabledFeatures={["tableHeader", "tableBody", "tableRow", "tableActions"]}
          useCustomStyles={useCustomStyles}
          customClass={customClass}
        />
      }

      searchComponent={
        <AdminMemberSearchControls
          memberSearchTerm={memberSearchTerm}
          handleMemberSearchTermChange={handleMemberSearchTermChange}
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
          memberSearchFieldsOptions={memberSearchFieldsOptions}
          memberSearchPeriodOptions={memberSearchPeriodOptions}
          enabledFeatures={["searchFieldSelector", "searchInput", "searchPeriodSelector"]}
          useCustomStyles={useCustomStyles}
          customClass={customClass}
        />
      }

      sortComponent={
        <AdminMemberSortControls
          memberSortCriteria={memberSortCriteria}
          handleMemberSortCriteriaChange={handleMemberSortCriteriaChange}
          memberSortDirection={memberSortDirection}
          handleMemberSortDirectionChange={handleMemberSortDirectionChange}
          memberSortCriteriaOptions={memberSortCriteriaOptions}
          enabledFeatures={["sortCriteria", "sortDirection"]}
          useCustomStyles={useCustomStyles}
          customClass={customClass}
        />
      }

      paginationComponent={
        <AdminMemberPaginationControls
          memberCurrentPage={memberCurrentPage}
          setMemberCurrentPage={setMemberCurrentPage}
          membersPerPage={membersPerPage}
          handleMembersPerPageChange={handleMembersPerPageChange}
          memberTotalPages={memberTotalPages}
          memberStartPage={memberStartPage}
          memberEndPage={memberEndPage}
          memberPerPageOptions={memberPerPageOptions}
          enabledFeatures={["itemsPerPageSelector", "pageNavigation"]}
          useCustomStyles={useCustomStyles}
          customClass={customClass}
        />
      }

      /*
      tableComponent={
        <AdminMemberTableHeader 
          currentMembers={currentMembers}
          handleEditClick={handleEditClick}
          handleDeleteMember={handleDeleteMember}
          enabledFeatures={["tableHeader", "tableRow", "tableActions"]}
          useCustomStyles={useCustomStyles}
          customClass={customClass}
        />
      }
      */
    />
  );
};

export default AdminMemberListForm;
