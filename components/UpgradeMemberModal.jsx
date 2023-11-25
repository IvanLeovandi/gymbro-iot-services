import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function UpgradeMemberModal(props) {
  const paymentLink = `/payment/member/${props.id}`;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="yellow_outline" className="mx-auto my-2 w-60">
            Upgrade ke Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Upgrade ke Member</DialogTitle>
          </DialogHeader>
          <div className="py-8">
            <p className="text-white">
              Apakah anda yakin ingin upgrade ke Member untuk 1 bulan ke depan?
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Batal
              </Button>
            </DialogClose>
            <Button variant="yellow_outline">
              <Link href={paymentLink}>Konfirmasi</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
