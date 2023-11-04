import { React, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Oauth from "../Components/Oauth";

export default function Signup() {
  //arrary destructuring
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const navigator = useNavigate();
  const changename = (e) => {
    let value = e.target.value;
    setname(value);
  };
  const changeemail = (e) => {
    let value = e.target.value;
    setemail(value);
  };
  const changepassword = (e) => {
    let value = e.target.value;
    setpassword(value);
  };
  const submit = async (e) => {
    seterror(false);
    setloading(true);
    e.preventDefault();
    console.log("submit called");
    try {
      console.log("submit called");
      let formData = { username: name, email: email, password: password };
      console.log(formData);
      const res = await fetch("/api/auth/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === false) {
        console.log(data.status);
        seterror(data.message);
        setloading(false);

        return;
      }
      
      console.log("else")
      setloading(false);
      console.log(data.message);
      navigator('/sign-in');
      
    }
    catch (e)
    {
      console.log(e.message);
      seterror(e.message);
      setloading(false);
   

    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={submit}>
        <input
          type="text"
          placeholder="userName"
          value={name}
          className="border p-3 rounded-t-lg"
          id="username"
          onChange={changename}
          name="username"
        ></input>
        <input
          type="email"
          placeholder="email"
          value={email}
          className="border p-3 rounded-t-lg"
          id="email"
          onChange={changeemail}
          name="email"
        ></input>
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-t-lg"
          id="password"
          value={password}
          name="password"
          onChange={changepassword}
        ></input>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <Oauth></Oauth>
      </form>

      <div className="flex gap-2 mt-5">
        <p> Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}
