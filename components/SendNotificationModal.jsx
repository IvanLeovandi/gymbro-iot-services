import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

export function SendNotificationModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="yellow_outline" className="mx-auto my-2 w-60">
          Send Notification
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Notification</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-4">
            <Label htmlFor="notification">
              Notification Message
            </Label>
            <Textarea className="bg-white" placeholder="Write your message" id="notification" />
        </div>
        <DialogFooter>
          <Button type="submit" variant="yellow_outline">Send notification</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
