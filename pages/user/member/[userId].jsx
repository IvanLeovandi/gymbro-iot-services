import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import { Fragment } from "react";
import Biocard from "@/components/biocard";
import Userpic from "@/components/userpic";

const MemberDetailPage = () => {
  const router = useRouter();
  const userId = router.query.userId
  return (
    <Fragment>
      <Navbar />
      <h1 className="mb-5 font-bold text-5xl">halo {userId}</h1>
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <Userpic /> 
        </div>
        <div className="col-span-3">
          <Biocard />
        </div>
      </div> 
    </Fragment>
  );
};

export default MemberDetailPage;