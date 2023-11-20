import React from 'react'
import { useSession } from 'next-auth/react'

export default function Biocard() {
  const { data: session, status } = useSession();
  console.log(session)
  return (
    <div>
      <div className="bg-gray-600   rounded-md overflow-hidden shadow-md max-w-7xl mx-auto mt-10s w-11/12 max-h">
          <div className="grid grid-cols-3 mx-2.5 mt-2">
            <label classname="text-white text-5xl">
              Nama
            </label>
            <label classname="text-white text-5xl">
              Jenis Kelamin
            </label>
            <label classname="text-white text-5xl">
              Usia
            </label>
          </div>
          <div className="grid grid-cols-3 mx-2.5">
            <p  className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-2.5">
              Nama
            </p>
            <p  className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded px-1">
              Male / Female
            </p>
            <p  className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-2.5">
              Usia
            </p>
          </div>
          <div className="mx-2.5">
            <label classname="pl-3 text-white text-5xl">
              Nomor Telepon
            </label>
            <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-3">
              (+62) xxx xxx xx
            </p>
          </div>
          <div className="mx-2.5">
            <label classname="text-white text-5xl ml-9">
              Email
            </label>
            <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-3">
              {session.user.email}
            </p>
          </div>
          <div className="mx-2.5 mb-5">
            <label classname="text-white text-5xl ml-9">
              Alamat
            </label>
            <p className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-3">
              Alamat
            </p>
          </div>
      </div>
    </div>
  )
}
