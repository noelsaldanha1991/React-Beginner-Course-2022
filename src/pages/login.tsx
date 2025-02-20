import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const signInwithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div>
      Sign with Google..
      <button onClick={signInwithGoogle}>Sign in with Google.. </button>
    </div>
  );
}

export default Login;
