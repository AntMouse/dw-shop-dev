// utils/adminNavigation.js

// ✅ 정적 경로
const ADMIN_STATIC_ROUTES = {
  memberList: "/admin/member/list",
  orderList: "/admin/order/list",
  productList: "/admin/product/list",
};

// ✅ 동적 경로
const ADMIN_DYNAMIC_ROUTES = {
  productEdit: (id) => `/admin/product/${id}/edit`,
};

// ✅ 범용 네비게이션 함수 (정적/동적 경로 자동 구분)
export const navigateToAdminPage = (navigate, page, params = null) => {
  let path = ADMIN_STATIC_ROUTES[page] || (ADMIN_DYNAMIC_ROUTES[page] && ADMIN_DYNAMIC_ROUTES[page](params));

  if (path) {
    navigate(path);
  } else {
    console.error(`잘못된 관리자 페이지 요청: ${page}`);
  }
};
