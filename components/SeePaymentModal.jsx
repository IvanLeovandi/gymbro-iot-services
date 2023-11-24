import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SeePaymentModal() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="yellow_outline" className="mx-auto my-2 w-60">See Payment Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] md:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-1">
                <h2 className="mb-4">Tanggal</h2>
                <p>Test</p>
              </div>
              <div className="col-span-2">
                <h2 className="mb-4">Item</h2>
                <p>Test</p>
              </div>
              <div className="col-span-1">
                <h2 className="mb-4">Harga</h2>
                <p>Test</p>
              </div>
              <div className="col-span-1">
                <h2 className="mb-4">Metode Pembayaran</h2>
                <p>Test</p>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
