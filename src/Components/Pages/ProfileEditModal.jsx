import React, { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  min-width: 350px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: #1a73e8;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #155ab6; }
`;

const ProfileEditModal = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.photoURL || user?.avatar || "/default-avatar.png");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ name, bio, avatar });
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <Avatar src={avatar} alt="avatar" />
        <label>
          Change Avatar
          <Input type="file" accept="image/*" onChange={handleAvatarChange} />
        </label>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
        <Button onClick={handleSave}>Save</Button>
        <Button style={{ background: '#eee', color: '#333', marginTop: 8 }} onClick={onClose}>Cancel</Button>
      </Modal>
    </Overlay>
  );
};

export default ProfileEditModal;
