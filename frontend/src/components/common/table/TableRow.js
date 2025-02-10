// components/common/table/TableRow.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import React from "react";

const TableRow = ({ data, columns, renderActions }) => {
  const baseClass = "components-common-table-table-row";

  if (!data || !columns) return null; // ✅ 방어 코드 추가

  return (
    <tr className={baseClass}>
      {columns.map((column, index) => (
        <td key={index}>{data?.[column] ?? "-"}</td> // ✅ 안전한 데이터 접근 (`?.` 및 기본값 `-` 추가)
      ))}
      {renderActions && <td>{renderActions(data)}</td>}
    </tr>
  );
};

export default TableRow;