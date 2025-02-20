import React, { useState, useEffect } from "react";
import { Post as IPost } from "./main";

import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface Props {
  post: IPost;
  title: string;
}

interface Like {
  likeId:string;
  userId: string;
}

function Posts(props: Props) {
  const { post, title } = props;

  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>();

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    //console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLikes(data.docs.map((doc) => ({ likeId:doc.id, userId: doc.data().userId })));
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { likeId:newDoc.id, userId: user?.uid }] : [{ likeId:newDoc.id, userId: user?.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      //console.log(likeToDeleteQuery);
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      //console.log(likeToDeleteData);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      //console.log(likeToDelete);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) =>
         prev?.filter((like) => like.likeId !== likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId == user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  //navigate('/');

  return (
    <div>
      {/* <h1>{post.id} {title}</h1>
      <p>{post.userId}</p> */}
      <div className="title">
        <h1>@{post.username}</h1>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes : {likes.length}</p>}
      </div>

      <div className="body">
        <p>{post.title}</p>
      </div>

      <div className="footer">
        <p>{post.description}</p>
      </div>
    </div>
  );
}

export default Posts;
