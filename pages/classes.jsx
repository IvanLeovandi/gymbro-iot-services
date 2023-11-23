const { useState, useEffect } = require("react");
import { Fragment } from "react";
import Navbar from "@/components/navbar";
import React from "react";
import { toDateString } from "date";
import ClassCard from "@/components/classcard";
import { useContext } from "react";
import NotificationContext from "@/context/notification-context";

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [classLoading, setClassLoading] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    setClassLoading(true);
    fetch("/api/classes")
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.classes);
        setClassLoading(false);
      });
  }, []);
  return (
    <Fragment>
      <Navbar />
      <h1 className="text-6xl font-bold text-center my-[10px]">Classes</h1>
      {classLoading  && <p>Loading...</p>}
      {!classLoading && (
        <div className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1470px]:grid-cols-3">
          {classes.map((item) => (
            <ClassCard
              key={item._id}
              id = {item._id}
              tipe={item.tipe}
              instruktur={item.instruktur}
              jadwal={item.jadwal}
              deskripsi={item.deskripsi}
              harga={item.harga}
              user={item.user}
              kapasitas={item.kapasitas}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default ClassPage;
