import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import { Fragment } from "react";
import Biocard from "@/components/biocard";
import Userpic from "@/components/userpic";
import Userclasses from "@/components/userclasses";

const MemberDetailPage = () => {
  const router = useRouter();
  const userId = router.query.userId
  return (
    <Fragment>
      <Navbar />
      <h1 className="mb-5 font-bold text-5xl pl-4">Welcome, {userId}</h1>
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <Userpic /> 
        </div>
        <div className="col-span-3">
          <Biocard />
        </div>
      </div>
      <div className="text-right mr-[50px] mt-6">
        Valid Until : DD/MM/YYYY
      </div> 
      <div class="flex items-center p-4">
        <h2 class="mt-5 mb-5 font-bold text-5xl pl-4">Classes</h2>
        <div class="outline-white ml-10 mt-2.5">
          <button class="px-4 py-2 bg-[#D9D9D9] text-black">Upcoming Classes</button>
          <button class="px-4 py-2 bg-[#625959] text-white">Completed Classes</button>
        </div>
      </div>
      <Userclasses />
    </Fragment>
  );
};

export default MemberDetailPage;