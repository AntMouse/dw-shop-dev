// utils/adminNavigation.js

// 범용적인 관리자 페이지 네비게이션 함수
export const navigateToAdminListPage = (navigate, page) => {
  navigate(`/admin/${page}/list`);
};

// 각 페이지별 네비게이션 함수 (더 간결하게 정의)
export const navigateToAdminMemberList = (navigate) => navigateToAdminListPage(navigate, "member");