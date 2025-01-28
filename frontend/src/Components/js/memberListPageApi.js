import axios from 'axios';
import { showError, errorMessages } from './messages';
import { API_BASE_URL } from '../../config/api';

export const fetchMembers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/members`);
    return response.data;
  } catch (error) {
    showError(errorMessages.fetchMembers);
    throw error;
  }
};
