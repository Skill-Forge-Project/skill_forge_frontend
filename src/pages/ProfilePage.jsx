import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import ProfileHeader from "../components/UserProfile/ProfileHeader";
import ProfileMain from "../components/UserProfile/ProfileMain";
import Achievements from "../components/UserProfile/Achievements";
import UserStats from "../components/UserProfile/UserStats";
import Modal from "../components/Layout/Modal";
import { getUserById, getAvatarUrl } from "../services/usersService";
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { accessToken, checkValidToken } = useContext(AuthContext)
  const userId = localStorage.getItem("userId");
  const USER_API = import.meta.env.VITE_USERS_SERVICE_URL;


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userId, accessToken, checkValidToken);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
      }
    };

    const fetchAvatarUrl = async () => {
      try {
        const response = await fetch(`${USER_API}/users/${userId}/avatar`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const isTokenValid = await checkValidToken(response.status);

        if (isTokenValid) {
          if (!response.ok) {
            throw new Error("Failed to fetch avatar");
          }

          // Convert blob to object URL
          const imageBlob = await response.blob();
          const imageObjectUrl = URL.createObjectURL(imageBlob);
          setAvatarUrl(imageObjectUrl);
        } else {
          console.error("Error fetching avatar URL:", err.message);
        }
      } catch (err) {
        console.error("Error fetching avatar URL:", err.message);
      }
    };

    if (userId) {
      fetchUserData();
      fetchAvatarUrl();
    }
  }, [userId, accessToken, USER_API]);

  if (!user) return <div className="text-white">No user data...</div>;

  return (
    <>
      <Navbar />
      <div className="mx-auto min-h-screen p-10 bg-gradient-to-b from-[#141e30] to-[#123556] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column: ProfileHeader + Achievements */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <ProfileHeader user={user} avatarUrl={avatarUrl} />
            <Achievements />
          </div>

          {/* Right column: ProfileMain + UserStats */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <ProfileMain user={user} setModalOpen={setModalOpen} setModalMessage={setModalMessage} />
            <UserStats user={user} />
          </div>
        </div>
      </div>

      {/* Modal for profile update */}
      <Modal isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Profile Update" 
        message={modalMessage} 
      />
    </>
  );
};

export default ProfilePage;