import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Card from "../public/card.png";
import Image from "next/image";
import PlaceholderImage from "../public/placeholder.png";

export default function Userpic({ props, role }) {
  const [image, setImage] = useState(PlaceholderImage);

  useEffect(() => {
    if (props.profileImage) {
      setImage(props.profileImage);
    }
  }, [props.profileImage]);
  return (
    <Fragment>
      <div className="relative text-center rounded-md overflow-hidden shadow-md max-w-sm mx-auto mt-10s w-full md:w-11/12 max-h flex items-center justify-center">
        <Image src={Card} alt="Card" className="w-full h-[360px]" />
        <div className="absolute">
          <div className="h-[250px] w-80 mx-auto">
            <Image
              src={image}
              width={1000}
              height={1000}
              alt="image fitnes"
              className="w-[280px] h-[280px] mx-auto object-cover py-2"
            />
          </div>
          <p className="bg-white w-36 mx-auto text-black rounded mt-10 mb-2">
            {role}
          </p>
        </div>
      </div>
    </Fragment>
  );
}
