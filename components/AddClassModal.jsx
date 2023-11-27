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
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import Image from "next/image";
import { UploadDropzone } from "@/src/utils/uploadthing";

export function AddClassModal(props) {
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);

  const imageRef = useRef();
  const titleRef = useRef();
  const instructorRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const typeRef = useRef();
  const capacityRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredImage = imageUrl;
    const enteredTitle = titleRef.current.value;
    const enteredInstructor = instructorRef.current.value;
    const enteredDate = dateRef.current.value;
    const enteredTime = timeRef.current.value;
    const enteredType = typeRef.current.value;
    const enteredCapacity = capacityRef.current.value;
    const enteredPrice = priceRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    const newClass = {
      gambar: enteredImage,
      judul: enteredTitle,
      waktu: enteredTime,
      tanggal: enteredDate,
      deskripsi: enteredDescription,
      harga: enteredPrice,
      instruktur: enteredInstructor,
      kapasitas: enteredCapacity,
      tipe: enteredType,
      user: 0,
    };

    props.onAddClass(newClass);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFD700] py-3 md:py-4 text-black hover:bg-[#c4a80c] mt-4">
          Add Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[750px]">
        <form onSubmit={submitHandler}>
          <DialogHeader>
            <DialogTitle>Please Fill The Required Field</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="items-center gap-4">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Class Image"
                  width={1000}
                  height={1000}
                  className="w-full h-5/6 object-cover mt-3"
                />
              ) : (
                <UploadDropzone
                  required
                  className="bg-slate-200 h-full"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res[0].url);
                    setImageUrl(res[0].url);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}

              {imageUrl && (
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => setImageUrl("")}
                    variant="yellow_outline"
                  >
                    Change Image
                  </Button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="col-span-2">
                <Label htmlFor="title" className="text-right">
                  Class Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  placeholder="Class Title"
                  name = "title"
                  required
                  ref={titleRef}
                />
                <Label htmlFor="instructor" className="text-right">
                  Class Instructure
                </Label>
                <Input
                  id="instructor"
                  className="col-span-3"
                  placeholder="Class Instructor"
                  name="instructor"
                  required
                  ref={instructorRef}
                />
              </div>
              <div className="">
                <Label htmlFor="date" className="text-right">
                  Class Date
                </Label>
                <Input
                  id="date"
                  className="col-span-3"
                  placeholder="Class Date"
                  name = "date"
                  required
                  type="date"
                  ref={dateRef}
                />
              </div>
              <div className="">
                <Label htmlFor="time" className="text-right">
                  Class Time
                </Label>
                <Input
                  id="time"
                  className="col-span-3"
                  placeholder="Class Time"
                  name = "time"
                  required
                  type="time"
                  ref={timeRef}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="type" className="text-right">
                  Class Type
                </Label>
                <Input
                  id="type"
                  className="col-span-3"
                  placeholder="Class Type"
                  name = "type"
                  required
                  ref={typeRef}
                />
              </div>
              <div className="">
                <p>Max Slot : </p>
              </div>
              <div className="">
                <Input
                  id="slot"
                  className="col-span-3"
                  placeholder="Class Slot"
                  name = "slot"
                  type="number"
                  min="0"
                  required
                  ref={capacityRef}
                />
              </div>
              <div className="">
                <p>Price : </p>
              </div>
              <div className="flex items-center gap-2">
                <span>Rp</span>
                <Input
                  id="price"
                  className="col-span-3"
                  placeholder="Class Price"
                  name = "price"
                  type="number"
                  min="50000"
                  step="5000"
                  required
                  ref={priceRef}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Label htmlFor="description" className="text-right">
                Class Description
              </Label>
              <Textarea
                className="bg-white text-black"
                placeholder="Class Description"
                id="description"
                ref={descriptionRef}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
