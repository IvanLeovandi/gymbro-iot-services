import { Fragment, useContext, useEffect, useState } from "react";
import Membercard from "@/components/membercard";
import { getSession } from "next-auth/react";
import AdminNavbar from "@/components/adminnavbar";
import NotificationContext from "@/context/notification-context";
import { useRouter } from "next/router";
import NonMembercard from "@/components/nonmembercard";

const AdminMembersPage = () => {
  const [member, setMember] = useState([]);
  const [nonMember, setNonMember] = useState([]);
  const [loading, setLoading] = useState(false);

  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setMember(data.member);
        setNonMember(data.nonMember);
        setLoading(false);
      });
  }, []);

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
      })
      .then(() => {
        router.reload();
      });
  };

  const addNotificationHandler = (newNotification) => {
    notificationCtx.showNotification({
      title: "Send Notification",
      message: "Mengirim Notifikasi...",
      status: "pending",
    });
    fetch("/api/notification", {
      method: "POST",
      body: JSON.stringify(newNotification),
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
              message: error.message || "Error mengirimkan notifikas",
              status: "error",
            });
          });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Pengiriman berhasil!",
          message: "Notifikasi berhasil dikirim",
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
  };

  return (
    <Fragment>
      <AdminNavbar />
      {loading && <p>Loading...</p>}
      {!loading && (
        <Fragment>
          <h1 className="text-6xl font-bold text-center my-[10px]">Members</h1>
          <div className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1470px]:grid-cols-3 my-4">
            {member.map((user, index) => (
              <Membercard
                item={user}
                key={index}
                addNotification={addNotificationHandler}
                editMemberHandler={editMember}
              />
            ))}
          </div>
          <h1 className="text-6xl font-bold text-center my-[10px]">Non Members</h1>
          <div className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1470px]:grid-cols-3 my-4">
            {nonMember.map((user, index) => (
              <NonMembercard
                item={user}
                key={index}
                addNotification={addNotificationHandler}
                editMemberHandler={editMember}
              />
            ))}
          </div>
        </Fragment>
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
        destination: "/404",
        permanent: false,
      },
    };
  }

  if (session.user.email !== "admingymbro@gmail.com") {
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
