// services/member/memberService.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { handleRequest } from "../common/apiService";

/**
 * ✅ API 요청을 수행하고 데이터 반환하는 공통 함수
 * @param {Function} request - Axios 요청 함수
 * @returns {Promise<any>} - API 응답 데이터
 */

// ✅ 회원 정보 가져오기
export const getMemberById = (id) => handleRequest("get", `/api/members/${id}`);

// ✅ 회원 목록 조회
export const getMemberList = () => handleRequest("get", "/api/members");

// ✅ 회원 정보 수정 (memberType만 변경)
export const updateMemberType = async (id, memberType) => {
  try {
    // 1️⃣ 기존 데이터 가져오기
    const existingMember = await getMemberById(id);

    // 2️⃣ 기존 데이터를 유지하면서 memberType만 변경
    const updatedMemberData = {
      ...existingMember,
      memberType,
    };

    // 3️⃣ PUT 요청으로 기존 데이터 유지
    return handleRequest("put", `/api/members/${id}`, updatedMemberData);
  } catch (error) {
    console.error("회원 타입 변경 중 오류 발생:", error);
    throw error;
  }
};

// ✅ 회원 정보 업데이트 (회원 타입 변경 불가)
export const updateMember = async (id, memberData) => {
  try {
    // 1️⃣ 기존 데이터 가져오기
    const existingMember = await getMemberById(id);

    // 2️⃣ 회원 타입을 변경하지 않도록 제거
    const { memberType, ...filteredData } = memberData;

    // 3️⃣ 기존 데이터 유지 + 새로운 데이터 적용
    const updatedMemberData = {
      ...existingMember,
      ...filteredData, // 새로운 값 적용 (memberType 제외)
    };

    return handleRequest("put", `/api/members/${id}`, updatedMemberData);
  } catch (error) {
    console.error("회원 정보 업데이트 중 오류 발생:", error);
    throw error;
  }
};

// ✅ 회원 삭제
export const deleteMember = (id) => handleRequest("delete", `/api/members/${id}`);