import { Fragment, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Membercard from "@/components/membercard";
import { getSession } from "next-auth/react";
import AdminNavbar from "@/components/adminnavbar";

const AdminMembersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({})

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data.user);
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
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1470px]:grid-cols-3">
        {users.map((user, index) => (
          <Membercard item={user} key={index}/>
        ))}
      </div>
      )}
    </Fragment>
  );
};

export default AdminMembersPage;
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
