// hooks/search/useSearch.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import { useState, useCallback } from "react";

export const useSearch = (onSearch) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    if (onSearch) onSearch(searchTerm);
  }, [onSearch, searchTerm]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  }, [handleSearchSubmit]);

  return {
    searchTerm,
    handleSearchChange,
    handleSearchSubmit,
    handleKeyDown,
  };
};