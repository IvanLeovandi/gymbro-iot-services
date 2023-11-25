import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";

export function SendNotificationModal(props) {
  const notificationRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNotification = notificationRef.current.value;
    const userEmail = props.item.email;
    const date = Date.now();
    const newNotification = {
      email: userEmail,
      tanggal: date,
      message: enteredNotification,
    };
    props.onAddNotification(newNotification);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="yellow_outline" className="mx-auto my-2 w-60">
          Send Notification
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={submitHandler}>
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            <Label htmlFor="notification">Notification Message</Label>
            <Textarea
              className="bg-white text-black"
              placeholder="Write your message"
              id="notification"
              ref={notificationRef}
            />
          </div>
          <DialogFooter>
            <Button type="submit" variant="yellow_outline">
              Send notification
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
