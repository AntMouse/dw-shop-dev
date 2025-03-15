// components/admin/shared/search/AdminSearchControls.js

// 1. React 기본 라이브러리
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminComponentUtils } from "../../../../hooks/admin/shared/useAdminComponentUtils";

// 5. CSS 또는 스타일 파일
import styles from "./AdminSearchControls.module.css";

const AdminSearchControls = ({
  searchTerm,
  handleSearchTermChange,
  searchField,
  handleSearchFieldChange,
  selectedSearchPeriod,
  handleSearchPeriodChange,
  customStartDate,
  handleCustomStartDateChange,
  customEndDate,
  handleCustomEndDateChange,
  handleSearchSubmit,
  handleSearchKeyPress,
  searchFieldsOptions,
  searchPeriodOptions,
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
      {/* ✅ 검색 기준 필드 선택 */}
      {isFeatureEnabled("searchFieldSelector") && (
        <>
          <label>검색 기준:</label>
          <select value={searchField} onChange={handleSearchFieldChange}>
            {searchFieldsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      )}

      {/* ✅ 검색 입력 필드 */}
      {isFeatureEnabled("searchInput") && (
        <>
          <label>검색어:</label>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchTermChange} 
            onKeyDown={handleSearchKeyPress}
            placeholder="검색어 입력" 
          />
          <button onClick={handleSearchSubmit} className={styles.searchButton}>검색</button>
        </>
      )}

      {/* ✅ 기간 필터 */}
      {isFeatureEnabled("searchPeriodSelector") && (
        <>
          <label>기간:</label>
          <select value={selectedSearchPeriod} onChange={handleSearchPeriodChange}>
            {searchPeriodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* 🔥 "직접 입력"을 선택한 경우 날짜 입력 필드 표시 */}
          {selectedSearchPeriod === "직접 입력" && (
            <div className={styles.customDateContainer}>
              <label>시작 날짜:</label>
              <input type="date" value={customStartDate} onChange={handleCustomStartDateChange} />
              <label>종료 날짜:</label>
              <input type="date" value={customEndDate} onChange={handleCustomEndDateChange} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminSearchControls;