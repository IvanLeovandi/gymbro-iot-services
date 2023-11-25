import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

export function EditMemberModal({ user, onEditMember }) {
  const nameRef = useRef();
  const teleponRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredTelepon = teleponRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredAddres = addressRef.current.value;
    const currentEmail = user.email;

    const newValues = {
      nama: enteredName,
      telepon: enteredTelepon,
      email: enteredEmail,
      alamat: enteredAddres,
      currentEmail: currentEmail,
    };

    onEditMember(newValues);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="yellow_outline" className="mx-auto my-2 w-60">
          Edit Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
        <form onSubmit={submitHandler}>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={user.nama}
                className="col-span-3"
                ref={nameRef}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone number
              </Label>
              <Input
                id="phone"
                defaultValue={user.telepon}
                className="col-span-3"
                ref={teleponRef}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                defaultValue={user.email}
                className="col-span-3"
                type="email"
                ref={emailRef}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                defaultValue={user.alamat}
                className="col-span-3"
                ref={addressRef}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
