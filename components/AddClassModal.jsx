import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

export function AddClassModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#FFD700] py-4 text-black hover:bg-[#c4a80c]">Add Class</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>Please Fill The Required Field</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="col-span-2">
              <Label htmlFor="title" className="text-right">
                Class Title
              </Label>
              <Input id="title" className="col-span-3" placeholder="Class Title" required />
              <Label htmlFor="instructor" className="text-right">
                Class Instrucutre
              </Label>
              <Input id="instructor" className="col-span-3" placeholder="Class Instructor" required />
            </div>
            <div className="">
              <Label htmlFor="date" className="text-right">
                Class Date
              </Label>
              <Input id="date" className="col-span-3" placeholder="Class Date" required />
            </div>
            <div className="">
              <Label htmlFor="time" className="text-right">
                Class Time
              </Label>
              <Input id="time" className="col-span-3" placeholder="Class Time" required />
            </div>
            <div className="col-span-2">
              <Label htmlFor="type" className="text-right">
                Class Type
              </Label>
              <Input id="type" className="col-span-3" placeholder="Class Type" required />
            </div>
            <div className="">
              <p>Max Slot : </p>
            </div>
            <div className="">
              <Input id="slot" className="col-span-3" placeholder="Class Slot" type="number" min="0" required />
            </div>
            <div className="">
              <p>Price : </p>
            </div>
            <div className="flex items-center gap-2">
              <span>Rp</span>
              <Input id="price" className="col-span-3" placeholder="Class Price" type="number" min="50000" required />
            </div>
          </div>
          <div className="col-span-2">
            <Label htmlFor="description" className="text-right">
              Class Description
            </Label>
            <Textarea className="bg-white" placeholder="Class Description" id="description" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Class</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
