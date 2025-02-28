// components/admin/shared/table/AdminTable.js

// 1. React 기본 라이브러리
import React from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminComponentUtils } from "../../../../hooks/admin/shared/useAdminComponentUtils";

// 5. CSS 또는 스타일 파일
import styles from "./AdminTable.module.css";

const AdminTable = ({
  columns,
  currentItems,
  fields,
  editItemId,
  editItemData,
  handleItemUpdateInputValue,
  handleUpdateItem,
  handleItemCancelEdit,
  handleFetchItemDetail,
  handleDeleteItem,
  enabledFeatures = [],
  useCustomStyles = false,
  customClass = "",

  indexOffset = 1,
}) => {
  const { isFeatureEnabled, containerClass, isAnyFeatureEnabled } = useAdminComponentUtils(
    enabledFeatures,
    useCustomStyles,
    customClass,
    styles.container,
  );

  if (!isAnyFeatureEnabled) return null;

  return (
    <table className={containerClass}>
      {/* ✅ 테이블 헤더 */}
      {isFeatureEnabled("tableHeader") && (
        <thead className={styles.tableHeader}>
          <tr>
            <th>#</th> {/* ✅ 번호 열 기본값으로 포함 */}
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
      )}

      {/* ✅ 테이블 바디 */}
      {isFeatureEnabled("tableBody") && (
        <tbody>
          {Array.isArray(currentItems) && currentItems.length > 0 ? (
            currentItems.map((tableItem, index) => {
              const isEditing = editItemId === tableItem.id;

              // ✅ 테이블 행(`tr`) 활성화 여부 체크
              return isFeatureEnabled("tableRow") ? (
                <tr key={tableItem.id}>
                  <td>{indexOffset + index}</td> {/* ✅ 번호 열 기본값으로 포함 */}
                  {fields.map((field) => (
                    <td key={field.key}>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editItemData[field.key] || ""}
                          onChange={(e) => handleItemUpdateInputValue(e, field.key)}
                        />
                      ) : (
                        <span>{tableItem[field.key]}</span>
                      )}
                    </td>
                  ))}
                  {isFeatureEnabled("tableActions") && (
                    <td>
                      {isEditing ? (
                        <>
                          <button onClick={handleUpdateItem}>저장</button>
                          <button onClick={handleItemCancelEdit}>취소</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleFetchItemDetail(tableItem.id)}>수정</button>
                          <button onClick={() => handleDeleteItem(tableItem.id)}>삭제</button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ) : null;
            })
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className={styles.emptyRow}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      )}
    </table>
  );
};

export default AdminTable;