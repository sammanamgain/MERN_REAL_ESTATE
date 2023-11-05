import {  useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { app } from "./../firebase";
import { useDispatch} from "react-redux";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./../redux/user/userSlice.js";
import { current } from "@reduxjs/toolkit";

export default function Profile() {
    const dispatch = useDispatch();
  const [file, setfile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);

  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
 // const [filepercentage, setfilepercentage] = useState(0);
  const [formData, setformData] = useState({});
  //console.log(formData.avator);
  const [fileUploadError, setFileUploadError] = useState(false);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({ ...formData, avator: downloadURL })
          console.log(downloadURL);
        }
        );
       console.log(formData)
      }
    );
  };
  //console.log(formData);


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  console.log(file);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]:[e.target.value] })
  
  }
  const handlesubmit =async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log(e.target);
      console.log(formData);
      console.log(currentUser.id);
     const res = await fetch(`/api/user/update/${currentUser._id}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     });
     const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log('is it so?')
        dispatch(updateUserFailure(data.message));
        return;
      }
      else {
        dispatch(updateUserSuccess(data));
        console.log('update current user', currentUser);
      }
      
      
    }
    catch (e)
    {
        dispatch(updateUserFailure(e.message))
    }
    
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7"> Profile </h1>
      <form className="flex flex-col gap-4 " onSubmit={handlesubmit}>
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/"
        ></input>

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avator || currentUser.avator}
          alt="profile-image"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center ,mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="UserName"
          className="border p-3  rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3  rounded-lg"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password "
          placeholder="Password"
          className="border p-3  rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer ">Delete Account</span>
        <span className="text-red-700 cursor-pointer ">Sign Out</span>
      </div>
    </div>
  );
}
