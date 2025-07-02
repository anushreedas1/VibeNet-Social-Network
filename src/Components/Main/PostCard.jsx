import React, { useState, useContext, useEffect, useReducer } from "react";
import "./PostCard.css";
import avatar from "../../assets/images/avatar.jpg";
import like from "../../assets/images/like.png";
import comment from "../../assets/images/comment.png";
import remove from "../../assets/images/delete.png";
import addFriend from "../../assets/images/add-friend.png";
import { AuthContext } from "../AppContext/AppContext";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import {
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import CommentSection from "./CommentSection";

const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  if (typeof timestamp === 'string') return timestamp;
  if (timestamp.seconds) {
    // Firestore Timestamp object
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  }
  return '';
};

const PostCard = ({ uid, id, logo, name, email, text, image, timestamp }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const likesRef = doc(collection(db, "posts", id, "likes"));
  const likesCollection = collection(db, "posts", id, "likes");
  const singlePostDocument = doc(db, "posts", id);
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const [open, setOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const addUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].ref;
      await updateDoc(data, {
        friends: arrayUnion({
          id: uid,
          image: logo,
          name: name,
        }),
      });
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const q = query(likesCollection, where("id", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const likesDocId = await querySnapshot?.docs[0]?.id;
    try {
      if (likesDocId !== undefined) {
        const deleteId = doc(db, "posts", id, "likes", likesDocId);
        await deleteDoc(deleteId);
      } else {
        await setDoc(likesRef, {
          id: user?.uid,
        });
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      if (user?.uid === uid) {
        await deleteDoc(singlePostDocument);
      } else {
        alert("You cant delete other users posts !!!");
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getLikes = async () => {
      try {
        const q = collection(db, "posts", id, "likes");
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_LIKE,
            likes: doc.docs.map((item) => item.data()),
          });
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    };
    return () => getLikes();
  }, [id, ADD_LIKE, HANDLE_ERROR]);

  useEffect(() => {
    // Check if current user is following the post author
    const checkFollowing = async () => {
      if (!user || !uid || user.uid === uid) return;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docSnap = await getDocs(q);
      const userDoc = docSnap.docs[0]?.data();
      setIsFollowing(userDoc?.following?.includes(uid));
    };
    checkFollowing();
  }, [user, uid]);

  const handleFollow = async () => {
    if (!user || !uid || user.uid === uid) return;
    // Add to following for current user
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docSnap = await getDocs(q);
    const userRef = docSnap.docs[0]?.ref;
    // Add to followers for post author
    const q2 = query(collection(db, "users"), where("uid", "==", uid));
    const docSnap2 = await getDocs(q2);
    const authorRef = docSnap2.docs[0]?.ref;
    try {
      await updateDoc(userRef, { following: arrayUnion(uid) });
      await updateDoc(authorRef, { followers: arrayUnion(user.uid) });
      setIsFollowing(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUnfollow = async () => {
    if (!user || !uid || user.uid === uid) return;
    // Remove from following for current user
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docSnap = await getDocs(q);
    const userRef = docSnap.docs[0]?.ref;
    // Remove from followers for post author
    const q2 = query(collection(db, "users"), where("uid", "==", uid));
    const docSnap2 = await getDocs(q2);
    const authorRef = docSnap2.docs[0]?.ref;
    try {
      await updateDoc(userRef, { following: arrayRemove(uid) });
      await updateDoc(authorRef, { followers: arrayRemove(user.uid) });
      setIsFollowing(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="post-card mb-4">
      <div className="post-header">
        <img
          src={logo || avatar}
          alt="avatar"
          className="post-avatar"
        />
        <div className="flex flex-col ml-4">
          <p className="py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            {email}
          </p>
          <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            Published: {formatTimestamp(timestamp)}
          </p>
        </div>
        {user?.uid !== uid && (
          <div
            onClick={addUser}
            className="w-full flex justify-end cursor-pointer mr-10"
          >
            <img
              className="hover:bg-blue-100 rounded-xl p-2"
              src={addFriend}
              alt="addFriend"
            />
          </div>
        )}
      </div>
      <div className="post-content">
        <p className="ml-0 pb-4 font-roboto font-medium text-base text-gray-800 no-underline tracking-normal leading-normal">
          {text}
        </p>
        {image && (
          <img className="post-image" src={image} alt="postImage" />
        )}
      </div>
      <div className="post-actions">
        <button
          className="post-action-button"
          onClick={handleLike}
        >
          <img className="h-8 mr-2" src={like} alt="like" />
          {state.likes?.length > 0 && state?.likes?.length}
        </button>
        <button
          className="post-action-button"
          onClick={handleOpen}
        >
          <img className="h-8 mr-2" src={comment} alt="comment" />
          Comments
        </button>
        <button
          className="post-action-button"
          onClick={deletePost}
        >
          <img className="h-8 mr-2" src={remove} alt="delete" />
          Delete
        </button>
        {user?.uid !== uid && (
          <button
            className="post-action-button ml-2"
            onClick={isFollowing ? handleUnfollow : handleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      {open && <CommentSection postId={id} />}
    </div>
  );
};

export default PostCard;

