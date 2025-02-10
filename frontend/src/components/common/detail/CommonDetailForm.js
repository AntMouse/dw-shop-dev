// components/common/detail/CommonDetailForm.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from 'react';

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useCommonStyles } from '../hooks/useCommonStyles';
import { useFeatureToggle } from '../hooks/useFeatureToggle';

// 5. CSS 또는 스타일 파일
import styles from './CommonDetailForm.module.css';

const CommonDetailForm = ({ 
  title, 
  formData, 
  formFields, 
  handleInputChange, 
  handleSaveClick, 
  handleCancelClick, 
  tableData, 
  enabledFeatures = [],
  useCustomStyles = false, 
  customClass = "", 
}) => {
  const containerClass = useCommonStyles(useCustomStyles, customClass, styles.container);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  return (
    <div className={containerClass}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.form}>
        {formFields
          .filter((field) => isFeatureEnabled(field.type))
          .map((field) => {
            const isDisabled = field.disabled ?? false;
            return (
              <div key={field.key}>
                <label className={styles.label}>{field.label}</label>
                {field.type === "select" ? (
                  <select className={styles.field} value={formData[field.key]} onChange={handleInputChange ? (e) => handleInputChange(e, field.key) : undefined} disabled={isDisabled}>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : (
                  <input type={field.type} className={styles.field} value={formData[field.key]} onChange={handleInputChange ? (e) => handleInputChange(e, field.key) : undefined} disabled={isDisabled} />
                )}
              </div>
            );
          })
        }

        {isFeatureEnabled("table") && tableData?.length > 0 && (
          <div className={styles.tableContainer}>
            <h2>주문 상세 내역</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  {Object.keys(tableData[0] || {}).map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.buttons}>
          {isFeatureEnabled("save") && handleSaveClick && <button onClick={handleSaveClick}>저장</button>}
          {isFeatureEnabled("cancel") && handleCancelClick && <button onClick={handleCancelClick}>취소</button>}
        </div>
      </div>
    </div>
  );
};

export default CommonDetailForm;
