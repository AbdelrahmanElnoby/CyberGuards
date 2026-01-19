import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

/**
 * Send a question to the chatbot API
 * @param {string} question - The question to ask the chatbot
 * @returns {Promise} Axios response with the chatbot answer
 */
export const getChatbotAnswer = async (question) => {
  try {
    const response = await axios.post(API_ENDPOINTS.CHATBOT_ANSWER, {
      question: question,
    });
    return response;
  } catch (error) {
    console.error('Chatbot API Error:', error);
    throw error;
  }
};
