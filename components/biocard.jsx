import React from 'react'

export default function Biocard() {
  return (
    <div>
      <div className="bg-gray-600   rounded-md overflow-hidden shadow-md max-w-7xl mx-auto mt-10s w-11/12 max-h">
          <div className="grid grid-cols-3 mx-2.5 mt-2">
            <div classname="text-white text-5xl">
              Nama
            </div>
            <div classname="text-white text-5xl">
              Jenis Kelamin
            </div>
            <div classname="text-white text-5xl">
              Usia
            </div>
          </div>
          <div className="grid grid-cols-3 mx-2.5">
            <div  className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-2.5">
              Nama
            </div>
            <div  className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded px-1">
              Male / Female
            </div>
            <div  className="bg-white mt-3 mb-3 text-black mr-2 ml-2 mx-auto rounded pl-2.5">
              Usia
            </div>
          </div>
          <div className="mx-2.5">
            <label classname="pl-3 text-white text-5xl">
              Nomor Telefon
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
              Email
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
