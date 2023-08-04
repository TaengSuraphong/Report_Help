import React, { useState } from "react";
import Axios from "axios";
import { FaGrav } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import {Link} from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    // e.preventDefault();
    Axios.post("https://report-help.netlify.app/api/login", {
      username: username,
      password: password,
    })
      .then((res) => {
        // console.log(res)
        if (res.data?.token) {
          // setLoginStatus(res.data.message);
          sessionStorage.setItem("token", res.data.token);
        } else {
          // setLoginStatus(res.data[0].email);
        }
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" loginForm h-screen flex justify-center items-center ">
      <div className=" sm:mx-[1rem] mx-[0.5rem] relative max-w-[600px] h-[600px] w-full bg-slate-200 text-center rounded-3xl">
        <Link to="/">
          <BsArrowLeftCircleFill className=" left-[2%] absolute text-gray-500 mt-[1rem] text-[1.5rem]" />
        </Link>
        <div className="flex justify-center items-center text-[4rem] font-semibold text-gray-500 py-[2rem]">
          <FaGrav />
          <h1 className=" font-bold">LOGIN</h1>
        </div>
        <div className="w-full pt-[3rem] flex justify-center items-center sm:gap-[1rem] gap-[0.1rem]">
          <BsFillPersonFill className=" text-[3rem] text-gray-500" />
          <input
            className="textInput text-[1.8rem] border-gray-300 border-[1px] rounded-md placeholder-slate-200 outline-none px-[5px]"
            type="text"
            name="password"
            placeholder="Username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="w-full pt-[3rem] flex justify-center items-center sm:gap-[1rem] gap-[0.1rem]">
          <GiPadlock className=" text-[3rem] text-gray-500" />
          <input
            className="textInput text-[1.8rem] border-gray-300 border-[1px] rounded-md placeholder-slate-200 outline-none px-[5px]"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input
          className="button hover:scale-105 cursor-pointer mt-[5rem] py-[1rem] px-[3rem] bg-sky-600 text-[1.8rem] font-semibold text-white rounded-2xl"
          type="submit"
          value="Login"
          onClick={login}
        />
        <p className=" py-[1.8rem]">All rights reserved. Do not copy © 2023</p>
      </div>
    </div>
  );
};

export default Login;
