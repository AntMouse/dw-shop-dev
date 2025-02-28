// components/admin/member/AdminMemberTable.js

// 1. React 기본 라이브러리
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import AdminTable from "../shared/table/AdminTable";

const AdminMemberTable = ({
  editMemberId,
  editMemberData,
  handleFetchMemberDetail,
  handleUpdateMember,
  handleDeleteMember,
  handleMemberUpdateInputValue,
  handleMemberCancelEdit,
  memberTableColumns,
  memberFields, 
  currentMembers = [],  
  enabledFeatures,
  useCustomStyles,
  customClass,
}) => {
  return (
    <AdminTable
      columns={memberTableColumns}
      currentItems={currentMembers} 
      fields={memberFields}
      editItemId={editMemberId}
      editItemData={editMemberData}
      handleItemUpdateInputValue={handleMemberUpdateInputValue}
      handleUpdateItem={handleUpdateMember}
      handleItemCancelEdit={handleMemberCancelEdit}
      handleFetchItemDetail={handleFetchMemberDetail}
      handleDeleteItem={handleDeleteMember}
      enabledFeatures={enabledFeatures}
      useCustomStyles={useCustomStyles}
      customClass={customClass}
    />
  );
};

export default AdminMemberTable;