const { useState, useEffect } = require("react");
import { Fragment } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Card from "../public/card.png";
import Image from 'next/image';

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/classes")
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.classes);
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <Navbar />
      {loading && <p>Loading...</p>}
      {!loading && 
        <div>
        {classes.map((item) => (
          <div key={item.id} className="flex p-10 w-1/2">
            <div className="relative">
              <Image src = {Card} alt="" className="w-1/2 "/>
              <div className="absolute top-[1.5vw] left-[2vw]">
                <h3 className="text-xl font-bold">{item.tipe}</h3>
                <hr className=" h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mt-[5px]"/>
                <p className="mt-[5px]">{item.instruktur}</p>
                <p>{item.deskripsi}</p>
                <p>{item.harga}</p>
                <p>{item.jadwal}</p>
                <p>{item.kapasitas}</p>
                <p>{item.user}</p>
              </div>
            </div>
          </div>
          ))}
        </div>}
    </Fragment>
  );
};

export default ClassPage;