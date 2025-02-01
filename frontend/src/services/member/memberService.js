// services/member/memberService.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import api from "../../config/api"; // ✅ api.js에서 axios 인스턴스를 가져옴

// 1. GET
// 회원 정보 가져오기
export const getMemberById = async (id) => {
  const response = await api.get(`/api/members/${id}`);
  return response.data;
};

// 회원 목록 조회
export const getMemberList = async () => {
  const response = await api.get("/api/members");
  return response.data;
};

// 2. PUT
// 회원 정보 수정 (memberType만 변경)
export const updateMemberType = async (id, memberType) => {
  const response = await api.put(`/api/members/${id}`, { memberType });
  return response.data;
};
