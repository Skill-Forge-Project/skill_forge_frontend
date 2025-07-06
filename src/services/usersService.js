const USER_API = import.meta.env.VITE_USERS_SERVICE_URL;

// Get all users from the Users Service
export const getAllUsers = async (accessToken, checkValidToken) => {
  const res = await fetch(`${USER_API}/users`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  const isTokenValid = await checkValidToken(res.status);

  if (isTokenValid && res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(data.message || "Failed to fetch users");
  }
};

// Get a single user by ID from the Users Service
export const getUserById = async (userId, accessToken, checkValidToken) => {
  const res = await fetch(`${USER_API}/users/${userId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  const isTokenValid = await checkValidToken(res.status);

  if (isTokenValid && res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(data.message || "Failed to fetch user");
  }
};

// Get user avatar URL
export const getAvatarUrl = async (userId, accessToken, checkValidToken) => {
  const res = await fetch(`${USER_API}/users/${userId}/avatar`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      credentials: "include", // Include credentials for CORS requests

    },
  });

  const isTokenValid = await checkValidToken(res.status);

  if (isTokenValid && res.ok) {
    return res.url;
  } else {
    throw new Error("Failed to fetch avatar URL");
  }
};

// Update user information based on user ID
export const updateUser = async (userId, updatedData, accessToken, checkValidToken) => {
  const res = await fetch(`${USER_API}/update_user/${userId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const isTokenValid = await checkValidToken(res.status);

  if (isTokenValid && res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(data.message || "Failed to update user");
  }
};
