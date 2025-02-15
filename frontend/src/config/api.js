// config/api.js

// 2. 외부 라이브러리
import axios from "axios";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { getToken, removeToken } from "../utils/storage/tokenStorage";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ✅ 요청 인터셉터 (토큰 자동 추가)
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } 

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ✅ 응답 인터셉터 (401 에러 발생 시 로그아웃)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.replace("/login"); // ✅ `replace()`로 변경
    }
    return Promise.reject(error);
  }
);

export default api;