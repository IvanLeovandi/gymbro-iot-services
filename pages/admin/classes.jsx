const { useState, useEffect } = require("react");
import { Fragment } from "react";
import React from "react";
import ClassCard from "@/components/classcard";
import { AddClassModal } from "@/components/AddClassModal";
import { useContext } from "react";
import NotificationContext from "@/context/notification-context";
import AdminNavbar from "@/components/adminnavbar";
import PageLoader from "@/components/PageLoader";
import { getServerSession } from "next-auth";
import { authNext } from "../api/auth/[...nextauth]";

const AdminClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [profile, setProfile] = useState([]);
  const [classLoading, setClassLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [classesEnrolled, setClassesEnrolled] = useState([])

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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

  useEffect(() => {
    setUserLoading(true);
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data.user);
        setUserLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/classesEnrolled")
      .then((response) => response.json())
      .then((data) => {
        setClassesEnrolled(data.classesEnrolled);
      });
  }, []);

  let role;
  if (profile.role === "NM") {
    role = "Non-Member";
  } else if (profile.role === "M") {
    role = "Member";
  } else if (profile.role === "admin") {
    role = "Admin";
  } else {
    role = undefined;
  }

  const addClassHandler = (newClass) => {
    notificationCtx.showNotification({
      title: "Tambah kelas",
      message: "Kelas sedang ditambahkan...",
      status: "pending",
    });

    const tanggal = newClass.tanggal;
    const waktu = newClass.waktu;

    const jadwalKelas = new Date(`${tanggal}T${waktu}`);

    const kelasBaru = {
      gambar: newClass.gambar,
      judul: newClass.judul,
      jadwal: jadwalKelas,
      deskripsi: newClass.deskripsi,
      harga: newClass.harga,
      instruktur: newClass.instruktur,
      kapasitas: newClass.kapasitas,
      tipe: newClass.tipe,
      user: newClass.user,
    };

    fetch("/api/classes", {
      method: "POST",
      body: JSON.stringify(kelasBaru),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        response
          .json()
          .then((data) => {
            throw new Error(data.message || "Something went wrong");
          })
          .catch((error) => {
            notificationCtx.showNotification({
              title: "Error",
              message: error.message || "Something went wrong",
              status: "error",
            });
          });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Kelas berhasil ditambahkan",
          status: "success",
        });
        location.reload();
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong",
          status: "error",
        });
      })
      .then(() => {
        location.reload();
      });
  };

  return (
    <Fragment>
      {userLoading && classLoading ? (
        <PageLoader />
      ) : (
        <div>
          <AdminNavbar />
          <h1 className="text-6xl font-bold text-center my-[10px]">Classes</h1>
          {classLoading && userLoading && <p>Loading...</p>}
          {role === "Admin" && !classLoading && !userLoading && (
            <div className="text-right px-20">
              <AddClassModal onAddClass={addClassHandler}></AddClassModal>
            </div>
          )}
          {!classLoading && !userLoading && (
            <div className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1470px]:grid-cols-3 pb-12">
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
                  handleShowModal={handleShowModal}
                  classesEnrolled = {classesEnrolled}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authNext);

  if (!session || session.user.email !== "admingymbro@gmail.com") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AdminClassPage;
