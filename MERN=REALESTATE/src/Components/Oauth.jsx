import React from 'react'
import {GoogleAuthProvider,getAuth,signInWithPopup} from '@firebase/auth'
import { app } from './../firebase';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSucess,
  signInFailure,
} from "./../redux/user/userSlice.js";


import { json } from 'react-router-dom';
export default function Oauth() {
    const dispatch = useDispatch();
    const navigator=useNavigate();
    const handleonclick = async () => {
        try {
           
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            console.log({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            });
            const res = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
              }),
            });

            const data = await res.json();
            dispatch(signInSucess(data));
            navigator('/')
        }
        catch (e)
        {
            console.log("couldn't sign in with google", e);
        }
    }
  return (
    <div>
      <button
        onClick={handleonclick}
        type="button"
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
      >
        Continue with google
      </button>
    </div>
  );
}
