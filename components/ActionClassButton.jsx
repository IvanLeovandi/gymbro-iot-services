import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteClassAlert from "./DeleteClassAlert";
import { useContext, useState, useEffect } from "react";
import NotificationContext from "@/context/notification-context";
import { useRouter } from "next/router";

export default function ActionClassButton({ props, profile, classesEnrolled }) {
  const notificationCtx = useContext(NotificationContext);
  const [classEnrolled, setClassEnrolled] = useState([])
  const router = useRouter();

  useEffect(()=>{
    fetch("/api/classesEnrolled")
    .then((response) => response.json())
    .then((data) => {
      setClassEnrolled(data.classesEnrolled)
    })
  },[])

  const submitHandler = async () => {
    const kelasBaru = {
      email: profile.email,
      classId: props.id.toString(),
    };
    fetch("/api/classesEnrolled", {
      method: "POST",
      body: JSON.stringify(kelasBaru),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
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
            status: "error",
          });
        });
    });
  }
  const idKelas = props.id.toString();
  const paymentLink = `/payment/class/${idKelas}`;

  const jadwalKelas = new Date(props.jadwal);
  const tahunKelas = jadwalKelas.getFullYear();
  const bulanKelas = jadwalKelas.getMonth();
  const tanggalKelas = jadwalKelas.getDate();

  const deleteClassHandler = () => {
    notificationCtx.showNotification({
      title: "Hapus Kelas",
      message: "Kelas sedang dihapus...",
      status: "pending",
    });
    fetch("/api/classes/" + idKelas, {
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
              message: error.message || "Error menghapus kelas",
              status: "error",
            });
          });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Hapus berhasil!",
          message: "Kelas berhasil dihapus",
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

  const daftarHandler = async () => {
    const filteredClassEnrolled = classEnrolled.filter((kelas) => {
      return (
        kelas.classId === props.id.toString() && kelas.email === profile.email
      );
    });

    if (filteredClassEnrolled.length === 0) {
      await submitHandler();
      const inc = props.user + 1;
      const newData = {
        user: inc,
      };

      notificationCtx.showNotification({
        title: "Daftar Kelas",
        message: "Kelas sedang didaftarkan...",
        status: "pending",
      });
      fetch("/api/classes/" + idKelas, {
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
                message: error.message || "Error daftar kelas",
                status: "error",
              });
            });
        })
        .then((data) => {
          notificationCtx.showNotification({
            title: "Daftar berhasil!",
            message: "Berhasil mendaftar kelas",
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
    } else {
      notificationCtx.showNotification({
        title: "Gagal Mendaftar di Kelas",
        message: "Anda sudah terdaftar di kelas ini",
        status: "error",
      });
    }
  };

  console.log(profile)
  
  return (
    <div>
      <Dialog>
        {!profile || profile.role !== "admin" ? (
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="yellow_outline"
              className="ml-[240px] md:ml-[280px]"
            >
              Daftar
            </Button>
          </DialogTrigger>
        ) : (
          <DeleteClassAlert onDeleteClass={deleteClassHandler} />
        )}
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{props.tipe}</DialogTitle>
            <DialogDescription>{props.instruktur}</DialogDescription>
          </DialogHeader>
          <hr></hr>
          <p className="text-lg mt-[20px]">{props.deskripsi}</p>
          <div className="flex justify-between mt-[40px]">
            <p className="font-bold">Jadwal</p>
            <p>
              {tanggalKelas} {bulanKelas} {tahunKelas}
            </p>
          </div>
          <div className="flex justify-between ">
            <p className="font-bold">Harga</p>
            <p>{props.harga}</p>
          </div>
          <div className="inline-flex items-center justify-center w-full mt-[10px]">
            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3  font-medium bg-black -translate-x-[4px] text-white ">
              Daftar
            </span>
          </div>
          <div className="flex justify-center">
            {profile.length === 0 || profile.role === "NM" ? (
              <Link href={paymentLink}>
                <Button
                  variant="yellow_full"
                  className=" w-full py-3"
                  type="submit"
                >
                  Lanjut ke Pembayaran
                </Button>
              </Link>
            ) : (
              <Button
                variant="yellow_full"
                className=" w-full py-3"
                type="submit"
                onClick={daftarHandler}
              >
                Daftar
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
