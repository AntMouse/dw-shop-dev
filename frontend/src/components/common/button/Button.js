// components/common/button/Button.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useCommonStyles } from "../../../hooks/common/useCommonStyles";
import { useFeatureToggle } from "../../../hooks/common/useFeatureToggle";

// 5. CSS 또는 스타일 파일
import styles from "./Button.module.css";

const Button = ({
  text = "Click",
  onClick,
  type = "primary",
  disabled = false,
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",
}) => {
  const buttonClass = useCommonStyles(useCustomStyles, customClass, `${styles.button} ${styles[`button--${type}`]}`);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  if (!isFeatureEnabled("button")) return null; // ✅ 기능 기본 비활성화

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;