// components/admin/order/orderApi.js

import axios from 'axios';
import { showError, errorMessages } from './messages';
import { API_BASE_URL } from '../../../config/api';

// 주문 목록을 가져오는 함수
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/orders`);
    return response.data;
  } catch (error) {
    showError(errorMessages.fetchOrders);
    throw error;
  }
};

// 주문 ID로 주문을 가져오는 함수
export const fetchOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/orders/${id}`);
    return response.data;
  } catch (error) {
    showError(errorMessages.fetchOrders);
    throw error;
  }
};

// 주문을 업데이트하는 함수
export const updateOrder = async (id, orderData) => {
  try {
    await axios.put(`${API_BASE_URL}/api/admin/orders/${id}`, orderData);
  } catch (error) {
    showError(errorMessages.updateOrder);
    throw error;
  }
};

// 주문 상태 목록을 가져오는 함수
export const fetchOrderStatuses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/order-statuses`);
    return response.data;
  } catch (error) {
    showError(errorMessages.fetchOrderStatuses);
    throw error;
  }
};
