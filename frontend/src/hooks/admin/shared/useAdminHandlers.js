// hooks/admin/shared/useAdminHandlers.js

import { useState } from "react";

export const useAdminHandlers = (
  fetchItemListFunc, 
  fetchItemDetailFunc, 
  updateItemFunc, 
  deleteItemFunc, 
  onError
) => {
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState(null);
  const [items, setItems] = useState([]); // ✅ 공통 데이터 리스트 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItemList = async () => {
    setIsLoading(true);
    try {
      const data = await fetchItemListFunc();

      if (!Array.isArray(data) || data.length === 0) {
        if (onError) onError("불러온 데이터가 없습니다.");
        setItems([]);
        return;
      }

      setItems(data);
    } catch (error) {
      setError(`데이터를 불러오는 중 오류 발생: ${error.message}`);
      if (onError) onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchItemDetail = async (itemId) => {
    try {
      const item = await fetchItemDetailFunc(itemId);
      if (!item) {
        if (onError) onError("데이터를 불러올 수 없습니다.");
        return;
      }
      setEditItemData(item);
      setEditItemId(itemId);
    } catch (error) {
      setError(`데이터를 불러오는 중 오류 발생: ${error.message}`);
      if (onError) onError(error.message);
    }
  };

  const updateItem = async (requiredFields, onSuccess) => {
    // ✅ 필수 필드 검사
    for (const field of requiredFields) {
      if (!editItemData?.[field]) {
        if (onError) onError(`${field} 값을 입력해야 합니다.`);
        return;
      }
    }

    try {
      await updateItemFunc(editItemId, editItemData); // ✅ 저장 실행
      await fetchItemList();  // ✅ 최신 목록 다시 불러오기
      setEditItemId(null);
      setEditItemData(null);
      if (onSuccess) onSuccess("성공적으로 저장되었습니다.");
    } catch (error) {
      setError("저장 중 오류가 발생했습니다.");
      if (onError) onError(error.message);
    }
  };

  const deleteItem = async (itemId, onSuccess) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
  
    try {
      const response = await deleteItemFunc(itemId);
      
      if (response?.status === 200 || response?.status === 204) {
        await fetchItemList();
        if (onSuccess) onSuccess("성공적으로 삭제되었습니다.");
      } else {
        throw new Error("서버에서 삭제되지 않았습니다.");
      }
    } catch (error) {
      setError("삭제 중 오류가 발생했습니다.");
      if (onError) onError(error.message);
    }
  };  

  const updateInputValue = (event, key) => {
    setEditItemData((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const cancelEdit = () => {
    setEditItemId(null);
    setEditItemData(null);
  };

  return {
    editItemId,
    editItemData,
    items,
    setItems,
    isLoading,
    error,
    fetchItemList,
    fetchItemDetail,
    updateItem,
    deleteItem,
    updateInputValue,
    cancelEdit,
  };
};