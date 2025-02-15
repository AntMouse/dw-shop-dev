// utils/navigation/adminNavigation.js

import { navigateToPage } from "./navigation"; // ✅ 공용 네비게이션 함수 사용

// ✅ 관리자 정적 경로
const ADMIN_STATIC_ROUTES = {
  memberList: "/admin/member/list",
  orderList: "/admin/order/list",
  productList: "/admin/product/list",
};

// ✅ 관리자 동적 경로
const ADMIN_DYNAMIC_ROUTES = {
  productEdit: (id) => `/admin/product/${id}/edit`,
  memberEdit: (id) => `/admin/member/${id}`,
};

/**
 * ✅ 관리자 전용 네비게이션 함수 (공용 네비게이션 함수 활용)
 * @param {Function} navigate - React Router 네비게이션 함수
 * @param {string} page - 이동할 관리자 페이지 키값
 * @param {any} params - 동적 경로에 필요한 값
 */
export const navigateToAdminPage = (navigate, page, params = null) => {
  navigateToPage(navigate, { ...ADMIN_STATIC_ROUTES, ...ADMIN_DYNAMIC_ROUTES }, page, params, () => {
    navigate("/admin/dashboard"); // 🚀 잘못된 요청 시 관리자 대시보드로 이동
  });
};