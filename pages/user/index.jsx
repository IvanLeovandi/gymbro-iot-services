const { useState, useEffect } = require("react");
import Navbar from "@/components/navbar";
import { Fragment } from "react";
import Biocard from "@/components/biocard";
import Userpic from "@/components/userpic";
import ClassCard from "@/components/classcard";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import AdminNavbar from "@/components/adminnavbar";

const MemberDetailPage = () => {
  const { data: session, status } = useSession();
  const [classes, setClasses] = useState([]);
  const [classLoading, setClassLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({});

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
          {role !== "Admin" && (
            <div className="text-right mr-[50px] mt-6">
              Valid Until : DD/MM/YYYY
            </div>
          )}
          {role !== "Admin" && (
            <div class="flex items-center p-4">
              <h2 class="mt-5 mb-5 font-bold text-5xl pl-4">Classes</h2>
              <div class="outline-white ml-10 mt-2.5">
                <button class="px-4 py-2 bg-[#D9D9D9] text-black">
                  Upcoming Classes
                </button>
                <button class="px-4 py-2 bg-[#625959] text-white">
                  Completed Classes
                </button>
              </div>
            </div>
          )}
          {role !== "Admin" && (
            <div>
              <div className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1470px]:grid-cols-3">
                {classes.map((item) => (
                  <ClassCard
                    key = {item._id}
                    id = {item._id}
                    tipe={item.tipe}
                    instruktur={item.instruktur}
                    jadwal={item.jadwal}
                    deskripsi={item.deskripsi}
                    harga={item.harga}
                    user={item.user}
                    kapasitas={item.kapasitas}
                    handleShowModal={handleShowModal}
                  />
                ))}
              </div>
            </div>
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
