const AUTH_API = import.meta.env.VITE_AUTH_API;

export const login = async (data) => {
  const res = await fetch(`${AUTH_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Login failed");
  }

  return responseData;
};


export const signup = async (data) => {
  const res = await fetch(`${AUTH_API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Signup failed");
  }

  return responseData;
};


export const checkValidToken = async (responseStatus) => {
  if (responseStatus === 401) {
    const refreshToken = localStorage.getItem("refresh_token");

    const res = await fetch(`${AUTH_API}/refresh_access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`,
      }
    })

    if (res.ok) {
      const newAccessToken = await res.json();
      localStorage.setItem("token", newAccessToken.access_token);

      return true;
    }
  }

  return true;
}