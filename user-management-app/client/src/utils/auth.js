export const setTokenWithExpiration = (token) => {
  const tokenData = {
    token: token,
    timestamp: Date.now()
  };
  localStorage.setItem('authData', JSON.stringify(tokenData));
};

export const getValidToken = () => {
  const stored = localStorage.getItem('authData');
  if (!stored) return null;

  try {
    const tokenData = JSON.parse(stored);
    // Check if token is expired (24 hours)
    const isExpired = (Date.now() - tokenData.timestamp) > (24 * 60 * 60 * 1000);

    if (isExpired) {
      localStorage.removeItem('authData');
      return null;
    }

    return tokenData.token;
  } catch (error) {
    // Handle corrupted localStorage data
    console.error("Error getting token data:", error);
    localStorage.removeItem('authData');
    return null;
  }
};

export const clearToken = () => {
  localStorage.removeItem('authData');
};