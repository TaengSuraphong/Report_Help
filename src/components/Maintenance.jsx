import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
// import {MdBuild} from "react-icons/md";
import { TbBrandLaravel } from "react-icons/tb";
import { BsFillPencilFill } from "react-icons/bs";
import { GiBookshelf } from "react-icons/gi";
import { PiCalendarBlankDuotone } from "react-icons/pi";
// import { Link } from "react-router-dom";
import Axios from "axios";
import Footer from "./Footer";

const Maintenance = () => {
  const [ loading, setLoading ] = useState(false);
  const inputImgRef = useRef(null);
  const [ reportInfo, setReportInfo ] = useState({
    name: "",
    lastname: "",
    department: "",
    ip: "",
    date: "",
    detail: "",
    image: "",
    progress: "รอดำเนินการ",
    staff: ""
  })
  
  const handleFileDetails = () => {
    if (!inputImgRef.current?.files[0]?.name) {
      setReportInfo({...reportInfo, image: ""});
      return;
    }
    inputImgRef.current?.files
    let reader = new FileReader();
    reader.readAsDataURL(inputImgRef.current.files[0]);
    reader.onload = function () {
      setReportInfo({...reportInfo, image: reader.result});
    };
    reader.onerror = function (error) {
      setAlert({ type: error.name, message: error.message });
    };
  };

  const [getdata, setGetdata] = useState([]);

  const addReport = () => {
    setLoading(true)
    Axios.post("https://report-help.netlify.app/api/create", {
      name: reportInfo.name,
      lastname: reportInfo.lastname,
      department: reportInfo.department,
      ip: reportInfo.ip,
      date: reportInfo.date,
      detail: reportInfo.detail,
      image: reportInfo.image,
    }).then(() => {
      setGetdata([
        ...getdata,
        {
          name: reportInfo.name,
          lastname: reportInfo.lastname,
          department: reportInfo.department,
          ip: reportInfo.ip,
          date: reportInfo.date,
          detail: reportInfo.detail,
          image: reportInfo.image,
        },
      ]);
      inputImgRef.current.value = ""
      setReportInfo({
        name: "",
        lastname: "",
        department: "",
        ip: "",
        date: "",
        detail: "",
        image: ""
      })
      alert("แจ้งข้อมูลการแจ้งซ่อมสำเร็จ")
      setLoading(false)
    })
  };




  return (
    <div>
      <Navbar />
      <section
        className=" max-w-[1366px] m-auto border-slate-200 border-[0.5px] mt-[1rem]
         rounded-[20px] overflow-hidden my-[2rem] pb-[2.5rem] bg-slate-200"
      >
        <h1
          className=" sm:text-[1.8rem] text-[1.4rem] flex items-center gap-[10px] text-white
             bg-slate-600 px-[1rem] py-[1rem]"
        >
          <TbBrandLaravel />
          ข้อมูลการแจ้งซ่อม
        </h1>
        <form className=" lg:grid-cols-2 grid-cols-1 mt-[2rem] grid px-[2rem]">
          <div className="">
            <h1 className=" flex items-center gap-[5px] text-gray-600 text-[1.4rem]">
              <BsFillPencilFill />
              ข้อมูลผู้แจ้ง
            </h1>

            <div className=" m-[2rem]  ">
              <label className=" sm:flex flex-wrap items-center py-[0.5rem] text-gray-500">
                <h1 className=" w-[100px]">ชื่อ</h1>
                <input
                  className=" sm:pr-[10rem] pr-[5rem] px-[5px] outline-none border-[0.5px] border-gray-400 
                                py-[0.4rem] "
                  type="text"
                  placeholder="ชื่อจริง..."
                  value={reportInfo.name}
                  onChange={(event) => {
                    setReportInfo({...reportInfo, name: event.target.value});
                  }}
                />
              </label>
              <label className="sm:flex flex-wrap items-center py-[0.5rem] text-gray-500">
                <h1 className=" w-[100px]">นามสกุล</h1>
                <input
                  className=" sm:pr-[10rem] pr-[5rem] px-[5px] outline-none border-[0.5px] border-gray-400 
                                py-[0.4rem]"
                  type="text"
                  placeholder="นามสกุล..."
                  value={reportInfo.lastname}
                  onChange={(event) => {
                    setReportInfo({...reportInfo, lastname: event.target.value});

                  }}
                />
              </label>
              <label className="sm:flex flex-wrap items-center py-[0.5rem] text-gray-500">
                <h1 className=" w-[100px]">แผนก</h1>
                <input
                  className=" sm:pr-[10rem] pr-[5rem] px-[5px] outline-none border-[0.5px] border-gray-400 
                                py-[0.4rem]"
                  type="text"
                  placeholder="แผนก..."
                  value={reportInfo.department}
                  onChange={(event) => {
                    setReportInfo({...reportInfo, department: event.target.value});
                  }}
                />
              </label>
              <label className="sm:flex flex-wrap items-center py-[0.5rem] text-gray-500">
                <h1 className=" w-[100px]">IP เครื่อง</h1>
                <input
                  className=" sm:pr-[8rem] pr-[2rem] px-[5px] outline-none border-[0.5px] border-gray-400 
                                py-[0.4rem]"
                  type="text"
                  placeholder="IP เครื่อง..."
                  value={reportInfo.ip}
                  onChange={(event) => {
                    setReportInfo({...reportInfo, ip: event.target.value});
                  }}
                />
              </label>
              <label className="sm:flex flex-wrap items-center py-[0.5rem] text-gray-500">
                <h1 className=" w-[100px]">วันที่แจ้ง</h1>
                <input
                  className=" px-[5px] outline-none border-[0.5px] border-gray-400 
                                py-[0.4rem] "
                  type="date"
                  value={reportInfo.date}
                  onChange={(event) => {
                    setReportInfo({...reportInfo, date: event.target.value});
                  }}
                />
              </label>
            </div>
            <h1 className=" flex items-center gap-[5px] text-gray-600 mt-[6rem] text-[1.4rem]">
              <PiCalendarBlankDuotone />
              รูปภาพรายละเอียดปัญหา
            </h1>
            <div className=" mt-[2rem] sm:px-[4rem] px-[1rem]">
              <h1 className="text-gray-600">ไฟล์แนบ</h1>
              <input
                className=" cursor-pointer py-[1rem] rounded-md bg-white border-[1px] border-slate-400 px-[0.5rem]"
                type="file"
                ref={inputImgRef}
                onChange={handleFileDetails}
              />
            </div>
          </div>

          <div>
            <h1 className=" flex items-center gap-[5px] text-gray-600 text-[1.4rem] ">
              <GiBookshelf />
              รายละเอียดของปัญหา
            </h1>
            <div className=" lg:h-[32rem] h-[15rem] border-[0.5px] bg-white border-gray-400 outline-none p-[10px] mt-[2rem]">
              <textarea
              className=" w-full outline-none h-full"
                name="comment"
                placeholder="รายละเอียดของปัญหา...."
                value={reportInfo.detail}
                onChange={(event) => {
                  setReportInfo({...reportInfo, detail: event.target.value});
                }}
              ></textarea>
            </div>
          </div>
        </form>
        <div className=" mt-[3rem] flex justify-center items-center gap-[2rem]">
          {
            loading ?
            <button
            className=" bg-green-600 py-[0.5rem] px-[1.5rem] text-[1.4rem] rounded-[5px] text-white"
          >
            บันทึก
          </button>
          :
          <button
            
          onClick={addReport}
          className=" bg-green-600 py-[0.5rem] px-[1.5rem] text-[1.4rem] rounded-[5px] text-white"
        >
          บันทึก
        </button>
          }
          <button
            onClick={ () => {
              inputImgRef.current.value = ""
              setReportInfo({
                name: "",
                lastname: "",
                department: "",
                ip: "",
                date: "",
                detail: "",
                image: "",
                progress: "",
                staff: ""
              })
            }}
            className=" bg-red-600 py-[0.5rem] px-[1.5rem] text-[1.4rem] rounded-[5px] text-white"
          >
            ยกเลิก
          </button>
        </div>
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default Maintenance;
