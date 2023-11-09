const { useState, useEffect } = require("react");
import { Fragment } from "react";
import Navbar from "@/components/navbar";

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
        <ul>
          {classes.map((item) => (
          <li key={item._id}>
            <p>{item.tipe}</p>
            <p>{item.istruktor}</p>
            <p>{item.deskripsi}</p>
            <p>{item.harga}</p>
            <p>{item.jadwal}</p>
            <p>{item.kapasitas}</p>
            <p>{item.user}</p>
          </li>
          ))}
        </ul>}
    </Fragment>
  );
};

export default ClassPage;