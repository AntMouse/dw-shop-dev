// components/common/pagination/Pagination.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { calculatePaginationRange } from "../../../utils/pagination/paginationUtils"; // ✅ 페이지 버튼 계산 로직 가져오기
import { useCommonStyles } from "../hooks/useCommonStyles";
import { useFeatureToggle } from "../hooks/useFeatureToggle";

// 5. CSS 또는 스타일 파일
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  const containerClass = useCommonStyles(useCustomStyles, customClass, styles.container);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  if (!isFeatureEnabled("pageControls") && !isFeatureEnabled("pageNumbers")) return null; // ✅ 모든 기능이 비활성화되면 전체 숨김

  const { startPage, endPage } = calculatePaginationRange(currentPage, totalPages);

  const renderPageNumbers = () => {
    if (!isFeatureEnabled("pageNumbers")) return null; // ✅ 페이지 번호 기능이 꺼져 있으면 숨김
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.button} ${currentPage === i ? styles.active : ""}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className={containerClass}>
      {isFeatureEnabled("pageControls") && (
        <>
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>{"<<"}</button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>{"<"}</button>
        </>
      )}
      {renderPageNumbers()}
      {isFeatureEnabled("pageControls") && (
        <>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</button>
          <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>{">>"}</button>
        </>
      )}
    </div>
  );
};

export default Pagination;