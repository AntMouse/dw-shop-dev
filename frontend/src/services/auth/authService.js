// services/auth/authService.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { handleRequest } from "../common/apiService";
import { setToken, removeToken } from "../../utils/storage/tokenStorage";

/**
 * ✅ 로그인 요청
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @returns {Promise<Object>} - 로그인 응답 데이터
 */
export const login = async (email, password) => {
  const response = await handleRequest("post", "/api/login", { email, password });
  const { token } = response;
  setToken(token);
  return response;
};

/**
 * ✅ 로그아웃 처리
 */
export const logout = () => {
  removeToken();
};