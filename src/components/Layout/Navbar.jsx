import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getAvatarUrl } from "../../services/useAvatarUrl";
import "../../assets/styling/navbar.css";
import { FiSettings } from "react-icons/fi";
import skillForgeLogo from "../../assets/img/skill_forge_logo.png";
import { AuthContext } from "../../contexts/AuthContext";
const AUTH_API = import.meta.env.VITE_AUTH_API;



export default function Navbar() {
  const { accessToken, checkValidToken } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(null);


  useEffect(() => {
    const fetchUserAndAvatar = async () => {
      try {
        const meResponse = await fetch(`${AUTH_API}/me`, {
          credentials: "include",
        });
  
        if (!meResponse.ok) throw new Error("Session not found");
  
        const contentType = meResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid or empty response from /me");
        }

        const { user_id } = await meResponse.json();
  
        const avatarURL = await getAvatarUrl(user_id);
        setAvatarUrl(avatarURL);
      } catch (error) {
        console.error("Error loading avatar:", error);
      }
    };
  
    fetchUserAndAvatar();
  }, []);

  return (
    <nav className="p-0 flex justify-between items-center navbar_bg">
      <div className="font-bold text-lg">
        <Link to="/dashboard" className="p-0 flex flow-row secondary_text">
        <img src={skillForgeLogo} alt="Skill Forge Logo" className="w-12 h-12 inline-block ml-2 mr-4" />
        <p className="p-0 secondary_text">Skill Forge</p>
        </Link>
      </div>
      <div className="space-x-5 flex flex-row">
        <Link to="/admin" className="text-xl">
          <FiSettings className="text-2xl w-10 h-10" title="Admin Panel" />
        </Link>
        <Link to="/profile">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 object-cover cursor-pointer avatar_border"
            />
          )}
        </Link>
      </div>
    </nav>
  );
}