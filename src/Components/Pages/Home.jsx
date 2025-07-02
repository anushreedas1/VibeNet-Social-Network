import React, { useState, useContext } from "react";
import CardSection from "../Main/CardSection";
import Navbar from "../Navbar/Navbar";
import RightSide from "../RightSidebar/RightSide";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ProfileEditModal from "./ProfileEditModal";
import NotificationSystem from "./NotificationSystem";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { AuthContext } from "../AppContext/AppContext";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

const darkTheme = {
  background: "#18191a",
  text: "#f5f6fa",
  card: "#242526",
  accent: "#1a73e8",
};
const lightTheme = {
  background: "#f5f6fa",
  text: "#18191a",
  card: "#fff",
  accent: "#1a73e8",
};

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background 0.3s, color 0.3s;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #f5f6fa 0%, #e3eafc 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 0 32px 0;
  gap: 32px;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 24px 0;
  }
`;

const Sidebar = styled.div`
  flex: 0 0 320px;
  max-width: 320px;
  min-width: 260px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(26,115,232,0.06);
  padding: 24px 18px;
  margin-top: 24px;
  @media (max-width: 1200px) {
    margin: 0 auto 24px auto;
    width: 90vw;
    min-width: unset;
    max-width: unset;
  }
`;

const FeedMain = styled.div`
  flex: 1 1 700px;
  max-width: 700px;
  min-width: 0;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.06);
  padding: 32px 24px 24px 24px;
  margin-top: 24px;
  @media (max-width: 1200px) {
    width: 95vw;
    padding: 16px 4px;
    margin: 0 auto 24px auto;
  }
`;

const Fab = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  cursor: pointer;
  z-index: 1000;
  transition: background 0.2s;
  &:hover { background: #155ab6; }
`;

const Home = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [notification, setNotification] = useState(null);
  const [profile, setProfile] = useState({
    name: "John Doe",
    bio: "Building the future, one line at a time.",
    avatar: "/default-avatar.png",
  });
  const { user } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleProfileSave = async (data) => {
    setProfile(data);
    setNotification({ type: "success", message: "Profile updated!" });
    // Persist to Firestore
    if (user?.uid) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docSnap = await getDocs(q);
      const userRef = docSnap.docs[0]?.ref;
      if (userRef) {
        await updateDoc(userRef, {
          name: data.name,
          bio: data.bio,
          image: data.avatar,
        });
      }
    }
  };

  const handleLogout = async () => {
    // signOutUser should be available from context
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    window.location.href = "/login";
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <PageContainer>
        <Navbar />
        <div style={{ position: "fixed", top: 24, right: 32, zIndex: 2000, display: "flex", gap: 18 }}>
          <FiSettings
            size={28}
            style={{ cursor: "pointer", marginRight: 18 }}
            onClick={() => navigate("/settings")}
            title="Settings"
          />
          <BiLogOut
            size={28}
            style={{ cursor: "pointer" }}
            onClick={() => setShowLogout(true)}
            title="Logout"
          />
        </div>
        {showLogout && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 4px 32px rgba(0,0,0,0.12)", minWidth: 320, textAlign: "center" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 18 }}>Are you sure you want to logout?</h3>
              <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
                <button style={{ background: "#1a73e8", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }} onClick={handleLogout}>Yes</button>
                <button style={{ background: "#eee", color: "#333", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }} onClick={() => setShowLogout(false)}>No</button>
              </div>
            </div>
          </div>
        )}
        <FeedWrapper>
          <Sidebar>
            <CardSection />
          </Sidebar>
          <FeedMain>
            <Main />
          </FeedMain>
          <Sidebar>
            <RightSide />
          </Sidebar>
        </FeedWrapper>
        <Footer />
        <Fab onClick={() => setShowEdit(true)} title="Edit Profile">
          <span role="img" aria-label="edit">✏️</span>
        </Fab>
        {showEdit && (
          <ProfileEditModal
            user={profile}
            onClose={() => setShowEdit(false)}
            onSave={handleProfileSave}
          />
        )}
        <NotificationSystem
          notification={notification}
          onClose={() => setNotification(null)}
        />
      </PageContainer>
    </ThemeProvider>
  );
};

export default Home;
