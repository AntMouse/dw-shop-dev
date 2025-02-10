// utils/navigation/navigation.js

// ✅ 정적 경로 (공용)
export const STATIC_ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
};

/**
 * ✅ 범용 네비게이션 함수 (정적/동적 경로 자동 구분 + 커스텀 에러 핸들링 추가)
 * @param {Function} navigate - React Router 네비게이션 함수
 * @param {Object} routes - 정적 및 동적 경로 객체
 * @param {string} page - 이동할 페이지 키값
 * @param {any} params - 동적 경로에 필요한 값
 * @param {Function} [onError] - (선택) 에러 발생 시 실행할 콜백 함수
 */
export const navigateToPage = (navigate, routes, page, params = null, onError = null) => {
  let path = routes[page];
  
  // 동적 경로 처리
  if (typeof path === "function") {
    path = path(params);
  }

  if (path) {
    navigate(path);
  } else {
    console.error(`🚨 잘못된 페이지 요청: ${page}`);

    // 기본 홈으로 이동 OR 커스텀 에러 핸들러 실행
    if (onError && typeof onError === "function") {
      onError();
    } else {
      navigate(STATIC_ROUTES.home);
    }
  }
};