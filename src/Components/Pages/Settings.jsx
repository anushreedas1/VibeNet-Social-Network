import React from "react";
import styled from "styled-components";

const SettingsContainer = styled.div`
  max-width: 480px;
  margin: 48px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 18px;
`;

const ToggleLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
`;

const Switch = styled.input`
  width: 40px;
  height: 20px;
`;

const Settings = ({ darkMode, setDarkMode }) => {
  return (
    <SettingsContainer>
      <Title>Settings</Title>
      <ToggleRow>
        <Switch
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode((d) => !d)}
          id="darkModeSwitch"
        />
        <ToggleLabel htmlFor="darkModeSwitch">Dark Mode</ToggleLabel>
      </ToggleRow>
    </SettingsContainer>
  );
};

export default Settings; 