import React from 'react'
import {useForm} from  'react-hook-form'
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, collection} from 'firebase/firestore'
import { db } from '../../config/firebase';
import { auth } from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from 'react-router-dom';

interface CreateFormData {
  title:string;
  description:string;
}
const CreateForm = () => {

  const schema = yup.object().shape({
    title  : yup.string().required("you must enter a title"),
    description : yup.string().required("you must enter a description")
  });
 
  const { register, handleSubmit, formState :{errors}} = useForm<CreateFormData>({
    resolver : yupResolver(schema)
  });

  const postRefs = collection(db, "posts");

  const [user] = useAuthState(auth); 
  const navigate = useNavigate();

  const onCreatePost = async (data  : CreateFormData) => {
   await addDoc(postRefs, {
    title:data.title,
    description:data.description,
    username: user?.displayName,
    userId:user?.uid
   })

   navigate('/');
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder='title..'  {...register("title")} /> 
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder='description..' {...register("description")} />
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input type='submit' />
      </form>
    </div>
  )
}

export default CreateForm
