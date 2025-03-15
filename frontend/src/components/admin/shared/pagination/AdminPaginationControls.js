// components/admin/shared/pagination/AdminPaginationControls.js

// 1. React 기본 라이브러리
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminComponentUtils } from "../../../../hooks/admin/shared/useAdminComponentUtils";

// 5. CSS 또는 스타일 파일
import styles from "./AdminPaginationControls.module.css";

const AdminPaginationControls = ({
  currentPage,
  setCurrentPage,
  perPage,
  handlePerPageChange,
  totalPages,
  startPage,
  endPage,
  perPageOptions = [],
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  const { isFeatureEnabled, isAnyFeatureEnabled, containerClass } = useAdminComponentUtils(
    enabledFeatures,
    useCustomStyles,
    customClass,
    styles.container,
  );

  if (!isAnyFeatureEnabled) return null;

  return (
    <div className={containerClass}>
      {/* ✅ 페이지당 항목 개수 선택 */}
      {isFeatureEnabled("itemsPerPageSelector") && (
        <>
          <label>페이지당 항목 수:</label>
          <select value={perPage} onChange={handlePerPageChange}>
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            {totalPages > 1 && <option value={totalPages}>전체보기</option>}
          </select>
        </>
      )}

      {/* ✅ 페이지네이션 버튼 */}
      {isFeatureEnabled("pageNavigation") && (
        <div className={styles.paginationButtons}>
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>{"<<"}</button>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>{"<"}</button>

          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={currentPage === pageNumber ? styles.active : ""}
              >
                {pageNumber}
              </button>
            );
          })}

          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>{">>"}</button>
        </div>
      )}
    </div>
  );
};

export default AdminPaginationControls;
