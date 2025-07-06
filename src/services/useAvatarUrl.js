const USER_API = import.meta.env.VITE_USERS_SERVICE_URL;

// Fetch the user avatar from the server
export async function getAvatarUrl(userId) {
  // console.log(accessToken);
  try {
    const response = await fetch(`${USER_API}/users/${userId}/avatar`, {
      credentials: "include", // Include credentials for CORS requests
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