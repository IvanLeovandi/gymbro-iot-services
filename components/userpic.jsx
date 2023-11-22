import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Card from "../public/card.png";
import Image from "next/image";

export default function Userpic(props) {
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

  return (
    <Fragment>
      <div className="relative text-center rounded-md overflow-hidden shadow-md max-w-sm mx-auto mt-10s w-11/12 max-h flex items-center justify-center">
        <Image src={Card} alt="Card" className="w-full h-[350px]" />
          <div className="absolute">
            <div
              className="h-[218px] w-80 mx-auto mt-5"
              style={{
              backgroundImage: "url('https://source.unsplash.com/500x500')",
              }}
            ></div>
            <div className="bg-white w-36 mx-auto text-black rounded my-5">
              {props.role}
            </div>
          </div>
      </div>
    </Fragment>
  );
}
