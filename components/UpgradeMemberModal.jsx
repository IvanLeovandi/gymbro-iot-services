import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Berapa lama
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  type="text"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
