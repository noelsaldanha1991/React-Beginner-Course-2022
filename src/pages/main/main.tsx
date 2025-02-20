import React, { use, useEffect } from 'react'
import {getDocs, collection} from  'firebase/firestore'
import { db } from '../../config/firebase'
import {useState} from 'react'
import Posts from './post';

export interface Post {
  id:string;
  userId:string;
  title:string;
  username:string;
  description:string;
}

function Main() {
 
  const [postLists, setPostLists] = useState<Post[] | null >(null);
  const postRefs  = collection(db, "posts");
  
  const getPosts = async () => {
    const data  = await getDocs(postRefs);
    setPostLists((data.docs.map((doc) => ({...doc.data(), id:doc.id }))) as Post[]);
  }
  
  useEffect(() =>{
  getPosts();
  }, [])
  
  //getPosts();
  
  return (
    <div>
      {postLists?.map((post) => (
                <Posts post={post} title='test-title'/> //experiment
      ))}
    </div>
  )
}

export default Main
