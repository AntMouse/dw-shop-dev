import axios from 'axios';
import { showError, errorMessages } from './messages';
import { API_BASE_URL } from '../../../config/api';

export const fetchProductTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/product-types`);
    return response.data;
  } catch (error) {
    showError(errorMessages.fetchProductTypes);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products`);
    return response.data;
  } catch (error) {
    showError(errorMessages.fetchProducts);
    throw error;
  }
};

export const fetchMainType = async (subType) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/product-types`);
    const productType = response.data.find(pt => pt.productType === subType);
    return productType ? productType.parentType : '알 수 없음';
  } catch (error) {
    console.error('메인 타입을 불러오는 도중 오류가 발생했습니다.', error);
    return '알 수 없음';
  }
};
