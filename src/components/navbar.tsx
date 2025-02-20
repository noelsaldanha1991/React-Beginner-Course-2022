import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Navbar() {
  const [user] = useAuthState(auth); 
  //enables to refresh user data in real time
  //useAuthState is a custom React hook from the react-firebase-hooks library that subscribes to changes in the authentication state.
  //auth is your Firebase Auth instance, which you pass into the hook.
  //The user object represents the currently authenticated user (or null if no user is logged in).
  const userSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home </Link>
        {!user ? ( <Link to="/login"> Login </Link>) : (<Link to="/createpost"> Create Post </Link>)}
      </div>
      <div className="user">
        {/* <p>{auth.currentUser?.displayName}</p>
      <img src={auth.currentUser?.photoURL || ""} width="100" height="100" alt="alt pic.. !  " /> */}
        {/* {user && user.displayName}
        {user?.displayName} */}
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width="100" height="100" alt="alt pic.. !  "/>
            <button onClick={userSignOut}> Logout </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
