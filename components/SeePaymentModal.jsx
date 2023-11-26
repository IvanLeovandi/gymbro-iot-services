import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SeePaymentModal({ user }) {
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = `/api/payment/member/` + user.email;

  useEffect(() => {
    setLoading(true);
    fetch(fetchData)
      .then((response) => response.json())
      .then((data) => {
        setPaymentData(data.payment);
        setLoading(false);
      });
  }, []);

  let modalOutput;

  if (loading) {
    modalOutput = <p>Loading...</p>;
  }

  if (!paymentData) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="yellow_outline" className="mx-auto my-2 w-60">
            See Payment Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] md:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          <p>Payment not found</p>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (!loading) {
    const tanggalPembayaran = new Date(paymentData.tanggal);
    const tahun = tanggalPembayaran.getFullYear();
    const bulan = tanggalPembayaran.getMonth() + 1;
    const tanggal = tanggalPembayaran.getDate();
    const jam = tanggalPembayaran.getHours();
    const menit =
      (tanggalPembayaran.getMinutes() < 0 ? "0" : "") +
      tanggalPembayaran.getMinutes();
    const tanggalFix = `${tanggal}-${bulan}-${tahun} ${jam}:${menit}`;

    modalOutput = (
      <div>
        <div className="flex items-center space-x-2">
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-1">
              <h2 className="mb-4">Tanggal</h2>
              <p>{tanggalFix}</p>
            </div>
            <div className="col-span-2">
              <h2 className="mb-4">Item</h2>
              <p>{paymentData.item}</p>
            </div>
            <div className="col-span-1">
              <h2 className="mb-4">Harga</h2>
              <p>{paymentData.harga}</p>
            </div>
            <div className="col-span-1">
              <h2 className="mb-4">Metode Pembayaran</h2>
              <p>{paymentData.metode}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="yellow_outline" className="mx-auto my-2 w-60">
          See Payment Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        {modalOutput}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
