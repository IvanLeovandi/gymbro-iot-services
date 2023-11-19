import React from 'react'

export default function Userpic() {
  return (
    <div className="bg-gray-600 text-center rounded-md overflow-hidden shadow-md max-w-sm mx-auto mt-10s w-11/12 max-h" >
        <div className="h-52 w-80 mx-auto mt-5" style={{ backgroundImage:"url('https://source.unsplash.com/500x500')"}}>
        </div>
        <div className="bg-white w-36 mx-auto text-black rounded my-5">
            Non-Member
        </div>
    </div>
  )
}
