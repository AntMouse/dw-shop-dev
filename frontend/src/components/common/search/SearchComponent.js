// components/common/search/SearchComponent.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useCommonStyles } from "../hooks/useCommonStyles";
import { useFeatureToggle } from "../hooks/useFeatureToggle";

// 5. CSS 또는 스타일 파일
import styles from "./SearchComponent.module.css";

const SearchComponent = ({
  placeholder = "검색어를 입력하세요",
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onKeyDown,
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  const containerClass = useCommonStyles(useCustomStyles, customClass, styles.container);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  if (!isFeatureEnabled("searchComponent")) return null;

  const handleSubmit = () => {
    onSearchSubmit(searchTerm.trim()); // ✅ 검색어 공백 제거 후 실행
  };

  return (
    <div className={containerClass}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onSearchChange}
        onKeyDown={onKeyDown}
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        검색
      </button>
    </div>
  );
};

export default SearchComponent;
