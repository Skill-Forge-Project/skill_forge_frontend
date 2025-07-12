// import { getAvatarUrl } from "../services/useAvatarUrl";

const USER_API = import.meta.env.VITE_USERS_SERVICE_URL;
const AUTH_API = import.meta.env.VITE_AUTH_API;


// Get all users from the Users Service
export const getAllUsers = async () => {
  const res = await fetch(`${USER_API}/users`, {
  credentials: "include", // Include credentials for CORS requests
  headers: {
    "Content-Type": "application/json",
  },
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
  const res = await fetch(`${AUTH_API}/me`, {
    credentials: "include", // Include credentials for CORS requests
    headers: {
      "Content-Type": "application/json",
    },
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
  headers: {
    "Content-Type": "application/json",
  },
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

// Fetch the user avatar from the server
export async function getAvatarUrl(userId) {
  console.log(userId);
  try {
    const response = await fetch(`${USER_API}/users/${userId}/avatar`, {
      credentials: "include", // Include credentials for CORS requests
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const isTokenValid = await checkValidToken(response.status);

    if (response.ok) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch avatar URL");
    }

} catch (error) {
    console.error("Error fetching avatar URL:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Update user avatar based on user ID
export const updateUserAvatar = async (userId, avatarFile) => {
  const formData = new FormData();
  formData.append("avatar", avatarFile);

  const res = await fetch(`${USER_API}/update_user/${userId}/avatar`, {
    method: "PUT",
    credentials: "include", // Include credentials for CORS requests
    body: formData,
  });

  // const isTokenValid = await checkValidToken(res.status);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update user avatar");
  }
};

// Update user information based on user ID
export const updateUser = async (userId, updatedData) => {
  const res = await fetch(`${USER_API}/update_user/${userId}`, {
    method: "PUT",
    credentials: "include", // Include credentials for CORS requests
    body: JSON.stringify(updatedData),
    headers: {
      "Content-Type": "application/json"
    },
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
