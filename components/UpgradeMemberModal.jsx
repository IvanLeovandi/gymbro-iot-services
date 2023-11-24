import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpgradeMemberModal() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="yellow_outline" className="mx-auto my-2 w-60">
            Upgrade ke Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
          <form>
            <DialogHeader>
              <DialogTitle>Upgrade ke Member</DialogTitle>
            </DialogHeader>
              <div className="py-8">
                <p className="text-white">
                Apakah anda yakin ingin upgrade ke Member untuk 1 bulan ke
                depan?
                </p>
              </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" variant="yellow_outline">
                Konfirmasi
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
