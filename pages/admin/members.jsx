import { Fragment, useEffect, useState } from "react";
import Navbar from "@/components/navbar";

const AdminMembersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <Navbar />
      {loading && <p>Loading...</p>}
      {!loading && 
        <ul>
          {users.map((item) => (
          <li key={item._id}>
            <p>{item.nama}</p>
            <p>{item.email}</p>
            <p>{item.telepon}</p>
            <p>{item.usia}</p>
            <p>{item.alamat}</p>
            <p>{item.jenisKelamin}</p>
            <p>{item.username}</p>
            <p>{item.password}</p>
            <p>{item.role}</p>
          </li>
          ))}
        </ul>}
    </Fragment>
  );
};

export default AdminMembersPage;
