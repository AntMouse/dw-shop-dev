// services/common/apiService.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import api from "../../config/api"; 

/**
 * ✅ API 요청을 수행하는 공용 함수 (params, headers 지원)
 * @param {string} method - HTTP 메서드 (GET, POST, PUT, DELETE)
 * @param {string} url - 요청 URL
 * @param {object} [data] - 요청 바디 (GET 요청 시 필요 없음)
 * @param {object} [config] - 추가 옵션 (params, headers 등)
 * @returns {Promise<any>} - API 응답 데이터
 */
export const handleRequest = async (method, url, data = null, config = {}) => {
  const response = await api({
    method,
    url,
    data,
    ...config, // ✅ params, headers 같은 추가 옵션 전달 가능
  });
  return response.data;
};