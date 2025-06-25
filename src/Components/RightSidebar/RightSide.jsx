import React, { useState, useContext } from "react";
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
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const RightSide = () => {
  const [input, setInput] = useState("");
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friends;
  const [items, setItems] = useState([{ id: 1, name: "Suggestion 1" }]);

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

  return (
    <div className="flex flex-col h-screen bg-gray-800 shadow-lg border-2 rounded-l-xl">
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
      <div className="suggestion-actions">
        <button
          className="remove-button"
          onClick={() => handleRemove(1)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default RightSide;

