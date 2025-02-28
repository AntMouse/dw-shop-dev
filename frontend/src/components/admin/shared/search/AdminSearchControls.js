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
  searchFilters,
  handleSearchFilterChange,
  getSearchResults,
  handleSearchKeyPress,
  handleSearchSubmit,
  searchFieldsOptions,
  searchPeriodOptions,
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  const { isFeatureEnabled, containerClass, isAnyFeatureEnabled } = useAdminComponentUtils(
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
        </>
      )}

      {/* ✅ 검색 버튼 추가 */}
      {isFeatureEnabled("searchButton") && (
        <button onClick={handleSearchSubmit} className={styles.searchButton}>검색</button>
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
        </>
      )}

      {/* ✅ 속성 필터 */}
      {isFeatureEnabled("searchFilters") && (
        <div className={styles.filterContainer}>
          {Object.entries(searchFilters).map(([key, value]) => (
            <div key={key} className={styles.filterItem}>
              <label>{key}:</label>
              <select value={value} onChange={(e) => handleSearchFilterChange(key, e.target.value)}>
                <option value="">전체</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSearchControls;