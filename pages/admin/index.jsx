import Navbar from "@/components/navbar";
import { Fragment } from "react";
import Userpic from "@/components/userpic";
import Biocard from "@/components/biocard";

const AdminMenuPage = () => {
  return (
    <Fragment>
      <Navbar />
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
    </Fragment>
  );
};

export default AdminMenuPage;