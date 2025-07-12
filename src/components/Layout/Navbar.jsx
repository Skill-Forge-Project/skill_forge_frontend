import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getAvatarUrl } from "../../services/usersService";
import "../../assets/styling/navbar.css";
import { FiSettings } from "react-icons/fi";
import skillForgeLogo from "../../assets/img/skill_forge_logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import { getUserId } from "../../services/usersService";
import { set } from "date-fns";

//const AUTH_API = import.meta.env.VITE_AUTH_API;


export default function Navbar() {
  const { accessToken, checkValidToken } = useContext(AuthContext);
  const [userId, setUserId]  = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);


  // Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch user avatar
  useEffect(() => {
    if (!userId) return; // Ensure userId is available before fetching avatar
    const fetchAvatarUrl = async () => {
      if (userId) {
        try {
          const avatarURL = await getAvatarUrl(userId);
          setAvatarUrl(avatarURL);
        } catch (error) {
          console.error("Error loading avatar:", error);
        }
      }
    };

    fetchAvatarUrl();
  }, [userId]);

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