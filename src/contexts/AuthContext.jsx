import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(() => {
        const accessToken = JSON.parse(localStorage.getItem('token'));

        if (accessToken) {
            return '';
        }

        return accessToken;
    })

    const accessTokenSetter = (newToken) => {
        localStorage.setItem("token", newToken);
        setAccessToken(newToken)
    }

    // Checks if access token is valid
    // If access token has expired, a request to the refresh_access_token endpoint is sent and the access token is reset
    const checkValidToken = async (responseStatus) => {
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
          setAccessToken(newAccessToken);
    
          return true;
        }
    
        return false;
      }
    
      return true;
    }

    const contextValues = {
        accessToken,
        accessTokenSetter,
        checkValidToken
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )

}