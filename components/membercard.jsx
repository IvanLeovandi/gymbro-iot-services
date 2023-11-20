import React from 'react'
import Image from 'next/image'
// import { Button } from './ui/button'
import Dummy from "../public/image_dummy.jpg"
import Card from "../public/card.png"
import { Button } from "@/components/ui/button";

export default function Membercard(item) {
  return ( 
    <div className="relative w-[22%] h-[500px]">
        <Image src = {Card} alt="Card" className="w-full h-full"/>
        <div className="absolute top-[1.5vw] left-[2vw] right-[2vw]">
            <Image src= {Dummy} alt = "image fitnes" className="w-[300px] h-[300px]  py-[5px]"/>
            <hr className=" w-[280px] h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mt-[5px]"/>
            <div className="relative flex-col justify-center items-center text-center">
                <div className="my-5">
                    <div className="flex-col justify-center items">
                        <p className="font-bold">Nama</p>
                    </div>
                    <Button
                        variant="yellow_outline"
                        // onClick={props.handleShowModal}
                        className="mx-auto my-2 w-60"
                    >
                        Check Payment
                    </Button>
                    <Button
                        variant="yellow_outline"
                        // onClick={props.handleShowModal}
                        className="mx-auto my-2 w-60"
                    >
                        Send Notification
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}
