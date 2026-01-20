export const API_BASE_URLS = {

  URL_DETECTOR: "https://url-detector.skysoft-erb.com",
  AUTH: "http://authtest.duckdns.org",

  URL_DETECTOR: 'https://url-detector.skysoft-erb.com',
  AUTH: 'http://authtest.duckdns.org',
  CHATBOT: 'https://chatbot-api.skysoft-erb.com',

};

export const API_ENDPOINTS = {
  URL_PREDICT: `${API_BASE_URLS.URL_DETECTOR}/predict`,
  AUTH_LOGIN: `${API_BASE_URLS.AUTH}/api/auth/login`,
  AUTH_REGISTER: `${API_BASE_URLS.AUTH}/api/auth/register`,
  NETWORK_ANALYSER: "https://network-analyser.skysoft-erb.com/predict/",



  CHATBOT_ANSWER: `${API_BASE_URLS.CHATBOT}/api/chatbot/answer`,

};
