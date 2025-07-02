import React, { useState, useContext, useEffect } from "react";
import waterslide from "../../assets/images/waterslide.jpg";
import remove from "../../assets/images/delete.png";
import { AuthContext } from "../AppContext/AppContext";
import { Link } from "react-router-dom";
import "./RightSide.css";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  arrayRemove,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import styled from "styled-components";

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(26,115,232,0.06);
  padding: 24px 18px;
  margin-top: 24px;
  min-width: 260px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
`;

const RightSide = () => {
  const [input, setInput] = useState("");
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friends;
  const [items, setItems] = useState([{ id: 1, name: "Suggestion 1" }]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!user) return;
      const usersSnap = await getDocs(collection(db, "users"));
      const users = usersSnap.docs.map((doc) => doc.data());
      const currentUser = users.find((u) => u.uid === user.uid);
      const following = currentUser?.following || [];
      const notFollowed = users.filter(
        (u) => u.uid !== user.uid && !following.includes(u.uid)
      );
      setSuggestions(notFollowed);
    };
    fetchSuggestions();
  }, [user]);

  const searchFriends = (data) => {
    return data.filter((item) =>
      item["name"].toLowerCase().includes(input.toLowerCase())
    );
  };

  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleFollow = async (uid) => {
    if (!user || !uid || user.uid === uid) return;
    // Add to following for current user
    const usersSnap = await getDocs(collection(db, "users"));
    const userDocSnap = usersSnap.docs.find((d) => d.data().uid === user.uid);
    const userRef = userDocSnap?.ref;
    // Add to followers for suggested user
    const suggestedDocSnap = usersSnap.docs.find((d) => d.data().uid === uid);
    const suggestedRef = suggestedDocSnap?.ref;
    try {
      await updateDoc(userRef, { following: arrayUnion(uid) });
      await updateDoc(suggestedRef, { followers: arrayUnion(user.uid) });
      setSuggestions((prev) => prev.filter((s) => s.uid !== uid));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <SidebarContainer>
      <div className="flex flex-col items-center relative pt-10">
        <img className="h-48 rounded-md" src={waterslide} alt="nature"></img>
      </div>
      <p className="font-roboto font-normal text-sm text-white max-w-fit no-underline tracking-normal leading-tight py-2 mx-2">
        Through photography, the beauty of Mother Nature can be frozen in time.
        This category celebrates the magic of our planet and beyond — from the
        immensity of the great outdoors, to miraculous moments in your own
        backyard.
      </p>
      <div className="mx-2 mt-10">
        <p className="font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
          Friends:{" "}
        </p>
        <input
          className="border-2 border-gray-600 outline-none mt-4 p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 transition duration-300"
          name="input"
          value={input}
          type="text"
          placeholder="Search friends"
          onChange={(e) => setInput(e.target.value)}
        />
        {friendList?.length > 0 ? (
          searchFriends(friendList)?.map((friend) => {
            return (
              <div
                className="flex items-center justify-between bg-gray-600 hover:bg-gray-500 rounded-md p-2 my-2 transition duration-300 ease-in-out"
                key={friend.id}
              >
                <Link to={`/profile/${friend.id}`}>
                  <div className="flex items-center cursor-pointer">
                    <img
                      src={friend?.image || "/default-avatar.jpg"}
                      alt="User avatar"
                      className="suggestion-avatar"
                    />
                    <p className="ml-4 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                      {friend.name}
                    </p>
                  </div>
                </Link>
                <div className="mr-4">
                  <img
                    onClick={() =>
                      removeFriend(friend.id, friend.name, friend.image)
                    }
                    className="cursor-pointer w-5 h-5"
                    src={remove}
                    alt="deleteFriend"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-10 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
            Add friends to check their profile
          </p>
        )}
      </div>
      <div className="mx-2 mt-10">
        <p className="font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
          Friend Suggestions:
        </p>
        <div>
          {suggestions.length === 0 && <p className="text-white">No suggestions</p>}
          {suggestions.map((s) => (
            <div key={s.uid} className="flex items-center my-2">
              <img src={s.image || "/default-avatar.png"} alt="avatar" className="suggestion-avatar" />
              <span className="text-white ml-2">{s.name}</span>
              <button
                className="follow-button ml-auto"
                onClick={() => handleFollow(s.uid)}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="suggestion-actions">
        <button
          className="remove-button"
          onClick={() => handleRemove(1)}
        >
          Remove
        </button>
      </div>
    </SidebarContainer>
  );
};

export default RightSide;

