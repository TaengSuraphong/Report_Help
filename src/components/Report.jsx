import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// import icon
import { GiNotebook } from "react-icons/gi";
import { FaPowerOff } from "react-icons/fa";

const Report = () => {
  const fetchList = () => {
    Axios.get("https://report-help.netlify.app/api/report_list", {
      headers: { Authorization: sessionStorage.getItem("token") },
    }).then((response) => {
      let result = {};
      response.data.forEach((item) => {
        const { staff, date } = item;
        if (!result[staff]) {
          result[staff] = {
            staff: staff,
            Date_Convert: date,
            CountStaff: 1,
          };
        } else {
          result[staff].Date_Convert =
            date > result[staff].Date_Convert
              ? date
              : result[staff].Date_Convert;
          result[staff].CountStaff++;
        }
      });
      const finalResult = Object.values(result);
      setDatauserlist(finalResult);
    });
  };

  const navigate = useNavigate();
  const [datauserlist, setDatauserlist] = useState([]);
  useEffect(() => {
    if (!sessionStorage.getItem("token")) return navigate("/login");
    fetchList();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-[1366px] m-auto mt-[2rem] bg-slate-200 h-[800px] rounded-[20px] overflow-hidden mb-[2rem]">
        <div>
          <div
            className=" flex items-center justify-between gap-[0.2rem] text-[1.5rem] font-semibold 
            bg-slate-600 text-white"
          >
            <h1 className="flex items-center gap-[0.2rem] text-[1.5rem] font-semibold p-[1rem]">
              <GiNotebook />
              รายงานผลการซ่อม
            </h1>
            <Link to="/dashboard" className=" p-[1rem]">
              <FaPowerOff className=" text-red-500" />
            </Link>
          </div>

          <table className="border-collapse w-full text-center">
            <thead>
              <tr className=" text-center">
                <th>ชื่อผู้รับผิดชอบ</th>
                <th>จำนวนรายการซ่อม</th>
                <th>วันที่ซ่อมล่าสุด</th>
              </tr>
            </thead>
            <tbody>
              {datauserlist.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className=" text-center">{val.staff}</td>
                    <td className=" text-center">{val.CountStaff}</td>
                    <td className=" text-center">{val.Date_Convert}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* -------------------------------- */}

      <Footer />
    </div>
  );
};

export default Report;
