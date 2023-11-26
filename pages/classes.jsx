const { useState, useEffect } = require("react");
import { Fragment } from "react";
import Navbar from "@/components/navbar";
import React from "react";
import ClassCard from "@/components/classcard";
import PageLoader from "@/components/PageLoader";

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [profile, setProfile] = useState([]);
  const [classLoading, setClassLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [classesEnrolled, setClassesEnrolled] = useState([]);

  useEffect(() => {
    fetch("/api/classesEnrolled")
      .then((response) => response.json())
      .then((data) => {
        setClassesEnrolled(data.classesEnrolled);
      });
  }, []);

  useEffect(() => {
    fetch("/api/classes")
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.classes);
        setClassLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data.user);
        setUserLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {classLoading && userLoading && <PageLoader />}
      {!classLoading && (
        <Fragment>
          <Navbar />
          <h1 className="text-6xl font-bold text-center my-[10px]">Classes</h1>
          <div className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1470px]:grid-cols-3">
            {classes.map((item) => (
              <ClassCard
                key={item._id}
                gambar={item.gambar}
                judul={item.judul}
                id={item._id}
                tipe={item.tipe}
                instruktur={item.instruktur}
                jadwal={item.jadwal}
                deskripsi={item.deskripsi}
                harga={item.harga}
                user={item.user}
                kapasitas={item.kapasitas}
                profile={profile}
                classesEnrolled = {classesEnrolled}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ClassPage;
