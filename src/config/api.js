// API Configuration
export const API_BASE_URLS = {
  URL_DETECTOR: 'https://url-detector.skysoft-erb.com',
  AUTH: 'http://authtest.duckdns.org',
  CHATBOT: 'https://chatbot-api.skysoft-erb.com',
};

// API Endpoints
export const API_ENDPOINTS = {
  URL_PREDICT: `${API_BASE_URLS.URL_DETECTOR}/predict`,
  AUTH_LOGIN: `${API_BASE_URLS.AUTH}/api/auth/login`,
  AUTH_REGISTER: `${API_BASE_URLS.AUTH}/api/auth/register`,
  CHATBOT_ANSWER: `${API_BASE_URLS.CHATBOT}/api/chatbot/answer`,
};

// For development with proxy
export const API_PROXY_ENDPOINTS = {
  URL_PREDICT: '/api/predict',
};


