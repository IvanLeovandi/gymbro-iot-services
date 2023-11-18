const { useState, useEffect } = require("react");
import { Fragment } from "react";
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar";
import Card from "../public/card.png";
import Img_dum from "../public/image_dummy.jpg";
import React from 'react';
import Image from 'next/image';
import {toDateString} from 'date';

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
        <div className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1470px]:grid-cols-3">
        {classes.map((item) => (
          <div key={item.id} className="flex ml-auto mr-auto mt-[30px]">
            <div className="relative">
              <Image src = {Card} alt="Card" className="w-[420px] md:w-[480px] h-[580px]"/>
              <div className="absolute top-[20px] left-[30px] md:left-[40px] w-[360px] md:w-[400px]">
                <Image src= {Img_dum} alt = "image fitnes" className="w-[360px] md:w-[400px]  h-[300px]  py-[5px] ml-auto mr-auto"/>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className=" text-xl font-bold">{item.tipe}</h3>
                    <p className="text-sm">{item.instruktur}</p>
                  </div>
                  <p className="text-sm">{(item.jadwal).toString()}</p>
                </div>
                <hr className=" w-[360px] h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mt-[5px]"/>
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
                <Button
                  variant = "yellow_outline"
                  onClick={handleShowModal}
                  className="ml-[240px] md:ml-[280px]"
                  >
                    Details
                </Button>
                
              </div>
            </div>
          </div>
          ))}
        </div>}
    </Fragment>
  );
};

export default ClassPage;