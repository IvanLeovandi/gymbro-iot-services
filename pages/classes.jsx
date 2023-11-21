const { useState, useEffect } = require("react");
import { Fragment } from "react";
import Navbar from "@/components/navbar";
import React from "react";
import { toDateString } from "date";

import ClassCard from "@/components/classcard";

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
      <h1 className="text-6xl font-bold text-center mt-[10px] mb-[30px]">Classes</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1470px]:grid-cols-3">
          {classes.map((item) => (
            <ClassCard
              tipe={item.tipe}
              instruktur={item.instruktur}
              jadwal={item.jadwal}
              deskripsi={item.deskripsi}
              harga={item.harga}
              user={item.user}
              kapasitas={item.kapasitas}
              handleShowModal = {handleShowModal}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default ClassPage;
