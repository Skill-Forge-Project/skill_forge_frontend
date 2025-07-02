// Fetch the user avatar from the server
export async function getAvatarUrl(userId, accessToken, checkValidToken, userApiBase) {
  console.log(accessToken)
  try {
    const response = await fetch(`${userApiBase}/users/${userId}/avatar`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const isTokenValid = await checkValidToken(response.status);

    if (isTokenValid && response.ok) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } else {
      throw new Error("Failed to fetch avatar");
    }
  } catch (err) {
    console.error("Error fetching avatar:", err);
    return null;
  }
}