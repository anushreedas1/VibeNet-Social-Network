import React, { useState } from "react";
import CardSection from "../Main/CardSection";
import Navbar from "../Navbar/Navbar";
import RightSide from "../RightSidebar/RightSide";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ProfileEditModal from "./ProfileEditModal";
import NotificationSystem from "./NotificationSystem";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

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

const MainWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
`;
const Content = styled.div`
  display: flex;
  flex: 1;
  margin-top: 64px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 3;
  margin: 0 2vw;
  @media (max-width: 900px) {
    margin: 0;
  }
`;
const Right = styled.div`
  flex: 1;
  min-width: 320px;
  @media (max-width: 900px) {
    min-width: unset;
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
const DarkModeToggle = styled.button`
  position: fixed;
  top: 24px;
  right: 32px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const Home = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [notification, setNotification] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [profile, setProfile] = useState({
    name: "John Doe",
    bio: "Building the future, one line at a time.",
    avatar: "/default-avatar.png",
  });

  const handleProfileSave = (data) => {
    setProfile(data);
    setNotification({ type: "success", message: "Profile updated!" });
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <MainWrapper>
        <Navbar />
        <DarkModeToggle onClick={() => setDarkMode((d) => !d)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </DarkModeToggle>
        <Content>
          <Left>
            <CardSection />
            <Main />
          </Left>
          <Right>
            <RightSide />
          </Right>
        </Content>
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
      </MainWrapper>
    </ThemeProvider>
  );
};

export default Home;
