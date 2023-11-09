import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import { Fragment } from "react";

const MemberDetailPage = () => {
  const router = useRouter();
  const userId = router.query.userId
  return (
    <Fragment>
      <Navbar />
      <h1>halo {userId}</h1>
    </Fragment>
  );
};

export default MemberDetailPage;