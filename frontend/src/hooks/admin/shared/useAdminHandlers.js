// hooks/admin/shared/useAdminHandlers.js

// ✅ 목록 새로고침 핸들러
export const refreshList = async (getList, setItems, setDisplayedItemCount, setShowItems, setCurrentPage, getSortedItems, onError) => {
  try {
    const items = await getList();
    if (!Array.isArray(items) || items.length === 0) {
      if (onError) onError("불러온 데이터가 없습니다.");
      setItems([]);
      setDisplayedItemCount(0);
      return;
    }
    setItems(items);
    setDisplayedItemCount(getSortedItems(items, null).length); // ✅ 정렬된 데이터 개수 반영
    setShowItems(true);
    setCurrentPage(1);
  } catch (error) {
    if (onError) onError(`데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`);
  }
};

// ✅ 상세 정보 새로고침 핸들러
export const refreshDetail = async (getDetail, itemId, setItemData, onError) => {
  try {
    const item = await getDetail(itemId);
    if (!item) {
      if (onError) onError("데이터를 불러올 수 없습니다.");
      return;
    }
    setItemData(item);
  } catch (error) {
    if (onError) onError(`데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`);
  }
};

// ✅ 데이터 저장 핸들러 (필수 필드를 외부에서 전달받도록 수정)
export const saveData = async (updateFunction, itemId, itemData, requiredFields, refreshList, setItemId, setItemData, onSuccess, onError) => {
  // ✅ 필수 필드 검사
  for (const field of requiredFields) {
    if (!itemData?.[field]) {
      if (onError) onError(`${field} 값을 입력해야 합니다.`);
      return;
    }
  }

  try {
    await updateFunction(itemId, itemData);
    await refreshList(onError);
    setItemId(null);
    setItemData(null);
    if (onSuccess) onSuccess("성공적으로 저장되었습니다.");
  } catch (error) {
    if (onError) onError("저장 중 오류가 발생했습니다.");
  }
};

// ✅ 데이터 삭제 핸들러
export const deleteData = async (deleteFunction, itemId, onSuccess, onError) => {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    try {
      await deleteFunction(itemId);
      if (onSuccess) onSuccess("성공적으로 삭제되었습니다.");
    } catch (error) {
      if (onError) onError("삭제 중 오류가 발생했습니다.");
    }
  }
};

// ✅ 데이터 수정 핸들러 (공용)
export const editItem = async (getDetailFunction, itemId, setItemData, setItemId, onError) => {
  try {
    const itemData = await getDetailFunction(itemId);
    if (!itemData) {
      if (onError) onError("데이터를 불러올 수 없습니다.");
      return;
    }
    setItemData(itemData);
    setItemId(itemId);
  } catch (error) {
    if (onError) onError("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

// ✅ 입력값 변경 핸들러
export const updateInputValue = (event, key, setItemData) => {
  setItemData((prevState) => ({
    ...prevState,
    [key]: event.target.value,
  }));
};

// ✅ 취소 핸들러 (공용)
export const cancelEdit = (setItemId, setItemData) => {
  setItemId(null);
  setItemData(null);
};