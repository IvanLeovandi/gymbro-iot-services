import { useRouter } from "next/router";
import Navbar from "@/components/navbar";

const NonMemberDetailPage = () => {
  const router = useRouter();
  const userId = router.query.userId
  return (
    <Fragment>
      <Navbar />
      <h1>halo {userId}</h1>;
    </Fragment>
  );
};

export default NonMemberDetailPage;