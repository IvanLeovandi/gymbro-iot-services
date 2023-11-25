import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Card from "../public/card.png";
import Image from "next/image";
import PlaceholderImage from "../public/placeholder.png";

export default function Userpic({props, role}) {
  // const [role, setRole] = useState("");
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   fetch("http://localhost:3000/api/profile")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let role;
  //       if (data.user.role === "NM") {
  //         role = "Non-Member";
  //       } else if (data.user.role === "M") {
  //         role = "Member";
  //       } else {
  //         role = "Undefined";
  //       }

  //       setRole(role);
  //       setLoading(false);
  //     });
  // }, []);
  const [image, setImage] = useState(PlaceholderImage);

  useEffect(() => {
    if (props.profileImage) {
      setImage(props.profileImage);
    }
  });
  return (
    <Fragment>
      <div className="relative text-center rounded-md overflow-hidden shadow-md max-w-sm mx-auto mt-10s w-11/12 max-h flex items-center justify-center">
        <Image src={Card} alt="Card" className="w-full h-[350px]" />
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
