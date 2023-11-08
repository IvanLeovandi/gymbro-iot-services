import { useRouter } from "next/router";

const NonMemberDetailPage = () => {
  const router = useRouter();
  const userId = router.query.userId
  return <h1>Hallo {userId}</h1>;
};

export default NonMemberDetailPage;