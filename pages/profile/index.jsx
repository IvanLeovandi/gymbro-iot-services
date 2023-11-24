const { useState, useEffect } = require("react");
import Navbar from "@/components/navbar";
import { Fragment } from "react";
import Biocard from "@/components/biocard";
import Userpic from "@/components/userpic";
import ClassCard from "@/components/classcard";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import AdminNavbar from "@/components/adminnavbar";
import { Button } from "@/components/ui/button";
import NotificationAlert from "@/components/NotificationAlert";
import DeleteNotificationAlert from "@/components/DeleteNotificationAlert";
import NotificationContext from "@/context/notification-context";
import { useRouter } from "next/router";
import UpgradeMemberModal from "@/components/UpgradeMemberModal";

const MemberDetailPage = () => {
  const { data: session, status } = useSession();
  const [classes, setClasses] = useState([]);
  const [classLoading, setClassLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [notificationBox, setNofiticationBox] = useState(false);
  const [notification, setNotification] = useState([]);

  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

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
    setUserLoading(true);
    fetch("/api/notification")
      .then((response) => response.json())
      .then((data) => {
        setNotification(data.user);
        setNotificationLoading(false);
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

  const deleteNotificationHandler = () => {
    notificationCtx.showNotification({
      title: "Hapus Notifikasi",
      message: "Sedang menghapus Notifikasi...",
      status: "pending",
    });
    fetch("/api/notification", {
      method: "DELETE",
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
              title: "error",
              message: error.message || "Error menghapus notifikasi",
              status: "error",
            });
          });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Penghapusan berhasil!",
          message: "Notifikasi berhasil dihapus",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      })
      .then(() => {
        router.reload();
      });
  }

  return (
    <Fragment>
      {role !== "Admin" && <Navbar />}
      {role === "Admin" && <AdminNavbar />}
      {(classLoading || userLoading) && <p>Loading...</p>}
      {!classLoading && !userLoading && (
        <div className="px-20 py-10">
          <h1 className="mb-5 font-bold text-5xl pl-4">
            Welcome, {profile.nama}
          </h1>
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <Userpic role={role} />
            </div>
            <div className="col-span-3">
              <Biocard profile={profile} email={session.user.email} />
            </div>
          </div>
          {role === "Member" && (
            <div className="text-right mr-[50px] mt-6">
              Valid Until : DD/MM/YYYY
            </div>
          )}

          {role === "Non-Member" && (
            <div className="text-right mr-[50px] mt-6">
              <UpgradeMemberModal />
              {/* ni perlu diganti tipe inputnya...tolong ye gw hrs otw dlu */}
            </div>
          )}
          {role !== "Admin" && (
            <Fragment>
              <div className="flex items-center gap-12">
                <Button
                  variant="yellow_outline"
                  className="my-5 font-bold text-3xl lg:text-5xl"
                  onClick={() => {
                    setNofiticationBox(false);
                  }}
                >
                  Classes
                </Button>
                <Button
                  variant="yellow_outline"
                  className="my-5 font-bold text-3xl lg:text-5xl"
                  onClick={() => {
                    setNofiticationBox(true);
                  }}
                >
                  Notification
                </Button>
              </div>
              {!notificationBox ? (
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
                    />
                  ))}
                </div>
              ) : (
                <div className="w-3/4 lg:w-1/2">
                  {notification.length > 0 ? (
                  <DeleteNotificationAlert onDeleteNotification = {deleteNotificationHandler}/>
                  ) : (
                    <p className="text-lg text-slate-400">There's no notification</p>
                  )}
                  {notification.map((item, index) => (
                    <NotificationAlert notification={item} key={index}/>
                  ))}
                </div>
              )}
            </Fragment>
          )}

          {role === "Admin" && (
            <Fragment>
              <h1 className="mt-5 mb-5 font-bold text-5xl pl-4">Settings</h1>
              <div className="flex justify-center w-full py-10">
                <Link
                  href="/admin/classes"
                  className="mr-40 lg:text-3xl border border-dashed border-white hover:border-none px-10 py-4 rounded-xl hover:bg-[#FFD700] hover:text-black"
                >
                  Classes
                </Link>
                <Link
                  href="/admin/members"
                  className="lg:text-3xl border border-dashed border-white hover:border-none px-10 py-4 rounded-xl hover:bg-[#FFD700] hover:text-black"
                >
                  Members
                </Link>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default MemberDetailPage;
