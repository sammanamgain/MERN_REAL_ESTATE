/* eslint-disable react/jsx-no-comment-textnodes */
import { useState,useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setsearchTerm] = useState('');
  const handlesubmit = (e) => {
    e.preventDefault();
    //to preview query
    const urlparams = new URLSearchParams(window.location.search);
    urlparams.set('searchTerm', searchTerm);
    const searchQuery = urlparams.toString();
    navigate(`/search?${searchQuery}`);
    
  };
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const searchtermfromurl = urlparams.get('searchTerm');
    if (searchtermfromurl) {
      setsearchTerm(searchtermfromurl);
     }

  },[location.search]);
  return (
    <div>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Amgain</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center" onSubmit={handlesubmit}>
            <input
              className="bg-tranparent focus:outline-none w-24 sm:w-64"
              type="text"
              placeholder="Search...."
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
            />
            <button onSubmit={handlesubmit}>
              <FaSearch className="text-slate-600"></FaSearch>
            </button>
          </form>
          <ul className="flex gap-4">
            <Link to="/home">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                {" "}
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                About
              </li>
            </Link>
            <Link to="/profile ">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avator}
                  alt="image"
                />
              ) : (
                <li className=" text-slate-700 hover:underline">Sign In</li>
              )}
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
}
