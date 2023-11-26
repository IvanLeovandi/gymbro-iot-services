import Navbar from "@/components/navbar";
import { Fragment } from "react";
import Image from "next/image";
import Card from "../../../public/card.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import NotificationContext from "@/context/notification-context";

const ClassPaymentPage = (props) => {
  const [kelas, setKelas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("QRIS");
  const notificationCtx = useContext(NotificationContext);

  const { data: session, status } = useSession();

  const router = useRouter();
  const idKelas = router.query.classId

  if (!session) {
    router.replace("/authentication/login");
  }

  const classId = router.query.classId;
  const fetchLink = `/api/classes/${classId}`;

  useEffect(() => {
    setLoading(true);
    fetch(fetchLink)
      .then((response) => response.json())
      .then((data) => {
        setKelas(data.classDetail);
        setLoading(false);
      });
  }, []);

  const total = kelas.harga + kelas.harga * 0.1;

  const submitHandler = async () => {
    const inc = kelas.user + 1;
      const newData = {
        user : inc,
      }
  
      notificationCtx.showNotification({
        title: "Daftar Kelas",
        message: "Kelas sedang didaftarkan...",
        status: "pending",
      });
      fetch("/api/classes/"+idKelas, {
        method: "PATCH",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type" : "application/json"
        }
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
        // 
    const kelasBaru = {
      email: session.user.email,
      classId: idKelas,
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
    // 
    const paymentData = {
      judul: kelas.judul,
      harga: total,
      metode: payment,
      email: session.user.email,
    };

    const now = new Date();
    const expDate = new Date(now.setDate(now.getDate() + 30));

    fetch("/api/payment/class/" + idKelas, {
      method: "POST",
      body: JSON.stringify(paymentData),
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
              message: error.message || "Error payment",
              status: "error",
            });
          });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Payment berhasil!",
          message: "Pembayaran berhasil dilakukan",
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
        router.replace("/profile");
      });
  };


  return (
    <Fragment>
      <Navbar />
      {loading && <p>Loading...</p>}
      {!loading && (
        <Fragment>
          {" "}
          <h1 className="my-10 mx-10 text-5xl font-bold">Payment</h1>
          <div className="relative min-[1545px]:grid grid-cols-4 mx-10">
            <div className="col-span-3 relative rounded md:mr-10 h-[300px] min-[1545px]:pl-3 mb-[10px]">
              {" "}
              {/* BUAT PRODUK & HARGA */}
              <Image src={Card} alt="Card" className="w-full h-full" />
              <div className="absolute top-[1.5vw] left-[2vw] right-[2vw]">
                <h2 className="text-4xl font-bold mb-4">Order Summary</h2>
                <hr className="w-[60vw] lg:w-[50vw] h-[2.5px] bg-gradient-to-r from-transparent via-white to-transparent     mx-auto mb-5" />
                <div className="grid grid-cols-4">
                  <div className="col-span-3">
                    <h3 className="font-semibold text-3xl mb-4">Item</h3>
                    <p className="text-xl">{kelas.judul}</p>
                    <p className="text-xl">Service Charge</p>
                  </div>
                  <div className="col-span-1">
                    <h3 className="font-semibold text-3xl mb-4">Price</h3>
                    <p className="text-xl">Rp {kelas.harga}</p>
                    <p className="text-xl">Rp {kelas.harga * 0.1}</p>
                  </div>
                </div>
                <div className="text-right mt-10 font-bold text-3xl">
                  Total : {total}
                </div>
              </div>
            </div>

            <div className="items-center justify-center col-span-1 relative rounded">
              {" "}
              {/* Payment Method * Checkout */}
              <Image src={Card} alt="Card" className="w-[450px] h-[300px]" />
              <div className="absolute top-[0.5vw] flex flex-col mx-auto ml-5">
                <h2 className="col-span-1  h-[35 0px] text-3xl font-bold mx-auto my-5">
                  Payment Option
                </h2>
                <RadioGroup
                  onChange={(event) => {
                    setPayment(event.target.value);
                  }}
                  defaultValue="QRIS"
                  className="ml-4"
                >
                  <div className="flex items-center space-x-2 mt-3">
                    <RadioGroupItem value="QRIS" id="QRIS" />
                    <p>QRIS</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <p>Credit Card</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="virtual-account"
                      id="virtual-account"
                    />
                    <p>Virtual Account</p>
                  </div>
                </RadioGroup>
                <div className="flex items-center justify-center">
                  <Button
                    variant="yellow_outline"
                    className="mx-auto my-10 w-80 flex justify-center"
                    type="submit"
                    onClick={submitHandler}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/authentication/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default ClassPaymentPage;
