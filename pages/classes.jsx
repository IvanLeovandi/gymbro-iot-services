const { useState, useEffect } = require("react");
import { Fragment } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Card from "../public/card.png";
import Img_dum from "../public/image_dummy.jpg";
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Image from 'next/image';

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/classes")
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.classes);
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <Navbar />
      <h1 className="text-6xl font-bold text-center my-[10px]">Classes</h1>
      {loading && <p>Loading...</p>}
      {!loading && 
        <div>
        {classes.map((item) => (
          <div key={item.id} className="flex p-10 w-1/2">
            <div className="relative">
              <Image src = {Card} alt="Card" className="w-[55%] h-[580px]"/>
              <div className="absolute top-[1.5vw] left-[2vw]">
                <Image src= {Img_dum} alt = "image fitnes" className="w-[400px] h-[300px]  py-[5px] "/>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{item.tipe}</h3>
                    <p className="text-sm">{item.instruktur}</p>
                  </div>
                  <p className="text-sm">{item.jadwal}</p>
                </div>
                <hr className=" w-[380px] h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mt-[5px]"/>
                <p className="mt-[5px] h-[70px]">{item.deskripsi}</p>
                
                <div className="flex">
                  <div className="flex-col">
                    <p className="font-bold">Harga</p>
                    <p className="mb-[10px] text-md">Rp {item.harga}</p>
                  </div>

                  
                  <div className="flex-col ml-[100px]">
                    <p className="font-bold">Kuota</p>
                    <p className="mb-[10px] text-md">{item.user}/{item.kapasitas}</p>
                  </div>
                </div>
                <Popup trigger = 
                  <button
                  className="text-[#FFD700] font-sans border border-solid border-[#FFD700] rounded-lg px-8 py-2 hover:bg-[#FFD700] hover:text-black
                             ml-[280px]"
                  >
                    Details
                  </button>
                  modal nested
                >
                  <div className="bg-black h-500 w-500">
                    <p>AAAA</p>
                  </div>
                </Popup>
              </div>
            </div>
          </div>
          ))}
        </div>}
    </Fragment>
  );
};

export default ClassPage;