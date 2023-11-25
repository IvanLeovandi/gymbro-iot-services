import Navbar from "@/components/navbar";
import { Fragment } from "react";
import Image from "next/image";
import Card from "../../../public/card.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";

const PaymentPage = (props) => {
  const [kelas, setKelas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("QRIS");

  const {data:session, status} = useSession();
  
  const router = useRouter();

  if(!session) {
    router.replace('/authentication/login');
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

  const submitHandler =(e) => {
    e.preventDefault();
  }

  return (
    <Fragment>
      <Navbar />
      {loading && <p>Loading...</p>}
      {!loading && (
        <Fragment>
          {" "}
          <h1 className="my-10 mx-10 text-5xl font-bold">Payment</h1>
          <div className="relative grid grid-cols-4 mx-10">
            <div className="col-span-3 relative rounded mr-10 h-[300px] pl-3">
              {" "}
              {/* BUAT PRODUK & HARGA */}
              <Image src={Card} alt="Card" className="w-full h-full" />
              <div className="absolute top-[1.5vw] left-[2vw] right-[2vw]">
                <h2 className="text-4xl font-bold mb-4">Order Summary</h2>
                <hr className=" w-[950px] h-[2.5px] bg-gradient-to-r from-transparent via-white to-transparent     mx-auto mb-5" />
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
                <RadioGroup onChange={(event)=>{setPayment(event.target.value)}} defaultValue="QRIS" className="ml-4">
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
                <form onSubmit={submitHandler}>
                <div className="flex items-center justify-center">
                  <Button
                    variant="yellow_outline"
                    className="mx-auto my-10 w-80 flex justify-center"
                    type = "submit"
                  >
                    Proceed to Payment
                  </Button>
                </div>
                </form>
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

export default PaymentPage;


