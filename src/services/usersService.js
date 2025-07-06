const USER_API = import.meta.env.VITE_USERS_SERVICE_URL;

// Get all users from the Users Service
export const getAllUsers = async () => {
  const res = await fetch(`${USER_API}/users`, {
  credentials: "include", // Include credentials for CORS requests
  });

  // const isTokenValid = await checkValidToken(res.status);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch users");
  }
};

// Get user ID from /me endpoint
export const getUserId = async () => {
  const res = await fetch(`${USER_API}/me`, {
    credentials: "include", // Include credentials for CORS requests
  });

  if (res.ok) {
    const data = await res.json();
    return data.userId; // Assuming the response contains a userId field
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch user ID");
  }
};

// Get a single user by ID from the Users Service
export const getUserById = async (userId) => {
  const res = await fetch(`${USER_API}/users/${userId}`, {
  credentials: "include", // Include credentials for CORS requests
  });

  //const isTokenValid = await checkValidToken(res.status);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch user");
  }
};

// Get user avatar URL
export const getAvatarUrl = async (userId) => {
  const res = await fetch(`${USER_API}/users/${userId}/avatar`, {
    method: "GET",
    credentials: "include", // Include credentials for CORS requests
  });

  // const isTokenValid = await checkValidToken(res.status);

  if (res.ok) {
    const data = await res.json();
    return data.avatarUrl; // Assuming the response contains an avatarUrl field
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch avatar URL");
  }
};

// Update user information based on user ID
export const updateUser = async (userId, updatedData) => {
  const res = await fetch(`${USER_API}/update_user/${userId}`, {
    method: "PUT",
    credentials: "include", // Include credentials for CORS requests
    body: JSON.stringify(updatedData),
  });

  // const isTokenValid = await checkValidToken(res.status);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update user");
  }
};
