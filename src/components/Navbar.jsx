import React from "react";
import {MdManageHistory,MdAccountCircle} from "react-icons/md";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
    const loggedIn = React.useMemo(() => {
        let stat = false;
        if(sessionStorage.getItem("token")) stat = true;
        return stat;
    }, [])
  return (
    <div className=" bg-orange-500 ">
        <div className=" flex justify-between items-center max-w-[1366px] m-auto h-[50px]">
            <div className=" sm:text-[1.5rem] text-[1rem] flex items-center gap-[0.5rem] text-white mx-[0.5rem] ">
                <MdManageHistory/>
                <h1 className=" cursor-pointer" 
                    onClick={ e => navigate(loggedIn ? "/dashboard":"/") }>
                    ระบบแจ้งซ่อมบำรุงอุปกรณ์ IT
                </h1>
            </div>
            {
                loggedIn ? 
                <div className=" sm:text-[1.5rem]  text-white text-[1rem] mx-[0.5rem]">
                    <h1 className="flex items-center gap-[0.5rem] cursor-pointer font-semibold" onClick={ e => {
                        sessionStorage.removeItem("token")
                        navigate("/login")
                    }}>{"Logout"}<BiLogIn className=" text-[2rem]"/></h1>
                    
                </div>
            :
                <div className=" sm:text-[1.5rem] flex items-center gap-[0.5rem] text-white text-[1rem] mx-[0.5rem]">
                    <BiLogIn className="text-[2rem]" />
                    <Link to="/login" className=" font-semibold">Login</Link>
                </div>
            }
  
        </div>
    </div>
  );
};

export default Navbar;
