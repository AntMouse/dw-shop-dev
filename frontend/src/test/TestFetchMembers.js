// src/test/TestFetchMembers.js
import React, { useEffect } from "react";
import { useAdminFetchMemberList } from "../hooks/admin/member/useAdminFetchMemberList";

const TestFetchMembers = () => {
  const { members, filteredMembers = [], setMembers, setFilteredMembers, fetchItems, error, isLoading } = useAdminFetchMemberList();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div>
      <h1>회원 목록 테스트</h1>
      {isLoading && <p>⏳ 데이터 불러오는 중...</p>}
      {error && <p style={{ color: "red" }}>⚠️ 오류 발생: {error}</p>}
      {!isLoading && !error && (
        <ul>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <li key={member.id}>
                {member.memberName} - {member.email}
              </li>
            ))
          ) : (
            <p>😞 불러온 회원 데이터가 없습니다.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default TestFetchMembers;