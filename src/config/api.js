export const API_BASE_URLS = {
  URL_DETECTOR: "https://url-detector.skysoft-erb.com",
  AUTH: "https://authtest.skysoft-erb.com",
  CHATBOT: "https://chatbot-api.skysoft-erb.com",
  SPAM_DETECTOR: "https://spam-detector.skysoft-erb.com",
  PASSWORD_CHECKER: "https://password-checker.skysoft-erb.com",
};

export const API_ENDPOINTS = {
  // URL Detector
  URL_PREDICT: `${API_BASE_URLS.URL_DETECTOR}/predict`,

  // Authentication
  AUTH_LOGIN: `${API_BASE_URLS.AUTH}/api/auth/login`,
  AUTH_REGISTER: `${API_BASE_URLS.AUTH}/api/auth/register`,

  // Network Analyzer
  NETWORK_ANALYSER: "https://network-analyser.skysoft-erb.com/predict/",

  // Spam Detector
  SPAM_SCAN: `${API_BASE_URLS.SPAM_DETECTOR}/scan`,

  // Chatbot
  CHATBOT_ANSWER: `${API_BASE_URLS.CHATBOT}/api/chatbot/answer`,

  // Password Checker
  PASSWORD_CHECK: `${API_BASE_URLS.PASSWORD_CHECKER}/predict`,
};