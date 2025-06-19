import React, { useRef, useReducer, useState, useEffect, useContext } from "react";
import "./Main.css";
import { AuthContext } from "../AppContext/AppContext";
import PostCard from "./PostCard";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { FaImage, FaVideo, FaSmile } from "react-icons/fa";

const Main = () => {
  const { user, userData, collectionRef } = useContext(AuthContext);
  const textRef = useRef("");
  const fileRef = useRef(null);
  const scrollRef = useRef("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);
  const [notification, setNotification] = useState(null); // For custom notifications

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text,
          image: image,
          timestamp: serverTimestamp(),
        });
        setText("");
        // Show success notification
        setNotification({
          show: true,
          message: "Post submitted successfully!",
          type: "success",
        });
        setTimeout(() => setNotification(null), 3000); // Remove notification after 3 seconds
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        setNotification({ show: true, message: err.message, type: "error" });
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
      setNotification({
        show: true,
        message: "Please enter some text to post.",
        type: "error",
      });
    }
  };

  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        setNotification({ show: true, message: err.message, type: "error" });
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        setProgressBar(0);
      });
    };
    if (collectionRef) {
      postData();
    }
    return () => postData();
  }, [SUBMIT_POST, collectionRef]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>×</button>
        </div>
      )}
      <div className="post-form">
        <div className="user-profile">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="user"
            className="user-avatar"
          />
        </div>
        <textarea
          ref={textRef}
          className="post-input"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="post-actions">
          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={handleImageUpload}
          />
          <button
            className="action-button"
            onClick={() => fileRef.current.click()}
          >
            <FaImage /> Add Image
          </button>
          <button className="action-button">
            <FaVideo /> Live Video
          </button>
          <button className="action-button">
            <FaSmile /> Feeling/Activity
          </button>
          <button className="post-submit" onClick={handleSubmitPost}>
            Post
          </button>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full">
        {state?.error ? (
          <div className="flex justify-center items-center">
            <Alert color="red">
              Something went wrong refresh and try again...
            </Alert>
          </div>
        ) : (
          <div>
            {state?.posts?.length > 0 &&
              state?.posts?.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    logo={post?.logo}
                    id={post?.documentId}
                    uid={post?.uid}
                    name={post?.name}
                    email={post?.email}
                    image={post?.image}
                    text={post?.text}
                    timestamp={new Date(
                      post?.timestamp?.toDate()
                    )?.toUTCString()}
                  ></PostCard>
                );
              })}
          </div>
        )}
      </div>
      <div ref={scrollRef}>{/* refference for later */}</div>
    </div>
  );
};

export default Main;
