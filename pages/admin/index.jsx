import Navbar from "components/navbar";
import { Fragment } from "react";
import Userpic from "components/userpic";
import Biocard from "components/biocard";
import Link from "next/link"

const AdminMenuPage = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="px-20 py-10">
        <h1 className="mb-5 font-bold text-5xl pl-4">Welcome, Admin</h1>
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <Userpic />
          </div>
          <div className="col-span-3">
            <Biocard />
          </div>
        </div>
        <h1 className="mt-5 mb-5 font-bold text-5xl pl-4">Settings</h1>
        <div className="flex justify-center w-full py-10">
          <Link href="/admin/classes" className="mr-40 lg:text-3xl border border-dashed border-white hover:border-none px-10 py-4 rounded-xl hover:bg-[#FFD700] hover:text-black">Classes</Link>
          <Link href="/admin/members" className="lg:text-3xl border border-dashed border-white hover:border-none px-10 py-4 rounded-xl hover:bg-[#FFD700] hover:text-black">Members</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminMenuPage;
