import { Fragment, useContext, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Membercard from "@/components/membercard";
import { getSession } from "next-auth/react";
import AdminNavbar from "@/components/adminnavbar";
import NotificationContext from "@/context/notification-context";
import { useRouter } from "next/router";

const AdminMembersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

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

  const editMember = (newData) => {
    notificationCtx.showNotification({
      title: "Update data User",
      message: "Sedang mengupdate...",
      status: "pending",
    });
    fetch("/api/users", {
      method: "PATCH",
      body: JSON.stringify(newData),
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
              title: "error",
              message: error.message || "Error update profile user",
              status: "error",
            });
          });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Update berhasil!",
          message: "User profile berhasil diupdate",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      }).then(() => {
        router.reload();
      });
  };

  return (
    <Fragment>
      <AdminNavbar />
      <div className="flex flex-wrap justify-around">
        {users.map((user) => (
          <Membercard item={user} editMemberHandler={editMember}/>
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
