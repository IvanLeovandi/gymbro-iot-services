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
      <AdminNavbar />
      <div className="flex flex-wrap justify-around">
        {users.map((user) => (
          <Membercard item={user} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul>
          {users.map((item) => (
            <li key={item._id}>
              <p>{item.nama}</p>
              <p>{item.email}</p>
              <p>{item.telepon}</p>
              <p>{item.usia}</p>
              <p>{item.alamat}</p>
              <p>{item.jenisKelamin}</p>
              <p>{item.username}</p>
              <p>{item.password}</p>
              <p>{item.role}</p>
            </li>
          ))}
        </ul>
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
  
  if (session.user.email !== "admingymbro@gmail.com") {
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
