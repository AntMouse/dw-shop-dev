// components/admin/shared/table/AdminTableRow.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useCommonStyles } from "../../../common/hooks/useCommonStyles";
import { useFeatureToggle } from "../../../common/hooks/useFeatureToggle";

// 5. CSS 또는 스타일 파일
import styles from "./AdminTableRow.module.css";

const AdminTableRow = ({
  rowData,
  fields,
  onInputChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  isEditing,
  useCustomStyles = false,
  customClass = "",
  enabledFeatures = [],
}) => {
  const rowClass = useCommonStyles(useCustomStyles, customClass, styles.row);
  const isFeatureEnabled = useFeatureToggle(enabledFeatures);

  // ✅ 기능이 비활성화된 경우 렌더링하지 않음
  if (!isFeatureEnabled("tableRow")) return null;

  return (
    <tr className={rowClass}>
      {isFeatureEnabled("tableRow") ? (
          fields.map((field) => (
              <td key={field.key} className={styles.field}>
                  {isEditing ? (
                      <input
                          type="text"
                          className={styles.input}
                          value={rowData[field.key]}
                          onChange={(e) => onInputChange(e, field.key)}
                      />
                  ) : (
                      <div className={styles[field.key]}>
                          {rowData[field.key]}
                      </div>
                  )}
              </td>
          ))
        ) : (
          <>
            <td className={styles.field} colSpan={fields.length}>
              ⚠️ 데이터가 표시되지 않음 (isFeatureEnabled() = false)
            </td>
          </>
        )}

      {isFeatureEnabled("tableActions") && (
        <td className={styles.buttons}>
          {isEditing ? (
            <>
              <button onClick={onSave}>저장</button>
              <button onClick={onCancel}>취소</button>
            </>
          ) : (
            <>
              <button onClick={() => onEdit(rowData.id)}>수정</button>
              <button onClick={() => onDelete(rowData.id)}>삭제</button>
            </>
          )}
        </td>
      )}
    </tr>
  );
};

export default AdminTableRow;
