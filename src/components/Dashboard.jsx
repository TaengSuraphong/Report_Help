import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Axios from "axios";
import { TbBrandLaravel } from "react-icons/tb";
import {MdPlayArrow} from "react-icons/md";
import Footer from "./Footer";

const Dashboard = () => {
  const [showImage, setShowImage] = useState({
    src: "",
    open: false,
  });

  const openImage = (src) => {
    setShowImage({
      src: src,
      open: true,
    });
  };
  const closeImage = (src) => {
    setShowImage({
      src: "",
      open: false,
    });
  };

  const fetchList = () => {
    Axios.get("https://report-help.netlify.app/api/report_list", {
      headers: { Authorization: sessionStorage.getItem("token") },
    }).then((response) => {
      setDatauserlist(response.data);
    });
  };

  function progressupdate(id) {
    let staffValue = document.getElementById("staff-input-" + id).value;
    if (staffValue.length == 0)
      return alert("กรุณากรอกผู้รับผิดชอบ");
    Axios.put("https://report-help.netlify.app/api/update/" + id, {
      progress: "ดำเนินการเสร็จสิ้น",
      staff: staffValue,
    }).then(() => {
      fetchList();
    });
  }

  const navigate = useNavigate();
  const [datauserlist, setDatauserlist] = useState([]);
  useEffect(() => {
    if (!sessionStorage.getItem("token")) return navigate("/login");
    fetchList();
  }, []);

  return (
    <div>
      <Navbar className=" w-[1366px]" />
      <div
        className=" z-50 text-right rounded-2xl bg-slate-600 border-[2px] border-slate-600 
      absolute w-[800px] h-[600px] top-[20%] left-[29%] overflow-y-scroll"
        style={{ display: showImage.open ? "" : "none" }}
      >
        <button className=" w-full bg-slate-600 sticky top-0  h-[40px] " onClick={closeImage}>
          <h1
            className="flex justify-center items-center 
          h-[30px] w-[30px] text-white bg-red-600 px-[10px] rounded-full mx-[5px]"
          >
            X
          </h1>
        </button>
        <img className=" object-cover w-full" src={showImage.src} alt="" />
      </div>
    {/* end img */}

      <div className="w-[1366px] m-auto mt-[2rem] rounded-[10px] overflow-y-scroll mb-[3rem]">
        <div className=" h-screen border-[0.5px] border-slate-200 bg-slate-200">
          <div className=" sm:text-[1.8rem] text-[1rem] sticky top-0 flex justify-between items-center text-[white] 
          bg-slate-600 px-[1rem] py-[1rem]">
            <h1 className=" flex items-center gap-[10px] ">
              <TbBrandLaravel />
              ข้อมูลการแจ้งซ่อม
            </h1>
            <Link to="/report" className=" sm:text-[1.4rem] text-[1rem] flex items-center text-orange-400 font-medium">
              ข้อมูลรายการซ่อม
              <MdPlayArrow className=" text-[2rem]"/>
            </Link>
          </div>
          <table className="border-collapse w-full ">
            <thead>
              <tr>
                <th>ชื่อ</th>
                <th>แผนก</th>
                <th>IP เครื่อง</th>
                <th>วันที่แจ้ง</th>
                <th>รายละเอียดของปัญหา</th>
                <th>รูปภาพ</th>
                <th>สถานะ</th>
                <th>ผู้รับผิดชอบ</th>
              </tr>
            </thead>
            <tbody>
              {datauserlist.map((val, key) => {
                return (
                  <tr key={key} >
                    <td>
                      {val.name} {val.lastname}
                    </td>
                    <td>{val.department}</td>
                    <td>{val.ip}</td>
                    <td>{val.date}</td>
                    <td>{val.detail}</td>
                    <td>
                      {val.image ? (
                        <button
                          onClick={(e) => {
                            openImage(val.image);
                          }}
                          className=" p-[5px] bg-slate-500 text-white rounded-md"
                        >
                          ดูรูปภาพ
                        </button>
                      ) : null}
                    </td>
                    <td>
                      {val.progress == "รอดำเนินการ" ? (
                        <button className=" bg-orange-500 p-[5px] rounded-md text-white cursor-default">
                          {val.progress}
                        </button>
                      ) : (
                        <button className=" bg-green-500 p-[5px] rounded-md text-white cursor-default">
                          {val.progress}
                        </button>
                      )}
                    </td>
                    <td>
                      {val.progress == "รอดำเนินการ" ? (
                        <div className=" flex items-center gap-[0.5rem]">
                          <input className=" w-[10rem] outline-none py-[0.2rem] bg-transparent border-b-[0.5px] border-slate-500" type="text" id={"staff-input-" + val.id} />
                          <button
                            onClick={(e) => progressupdate(val.id)}
                            className=" bg-blue-500 p-[5px] rounded-md text-white"
                          >
                            บันทึก
                          </button>
                        </div>
                      ) : (
                        val.staff
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
