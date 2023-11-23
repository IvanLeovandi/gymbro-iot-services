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
