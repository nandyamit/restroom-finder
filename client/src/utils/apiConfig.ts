const getBaseUrl = () => {
    if (import.meta.env.PROD) {
      return ''; // Empty string for production as API will be on same domain
    }
    return 'http://localhost:3000'; // Development API URL
  };
  
  export const API_BASE_URL = getBaseUrl();