const getBaseUrl = () => {
  const isProd = import.meta.env.PROD || window.location.hostname !== 'localhost';
  return isProd ? '' : 'http://localhost:3000';
};

export const API_BASE_URL = getBaseUrl();