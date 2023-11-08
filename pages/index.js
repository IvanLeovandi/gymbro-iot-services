import { useEffect, useState } from "react";

const HomePage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/classes")
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.classes);
        setLoading(false);
      });
  }, []);

  return (
    <ul>
      { loading && <p>Loading...</p>}
      { !loading && classes.map((item) => (
        <li key={item._id}>
          <p>{item.tipe}</p>
          <p>{item.deskripsi}</p>
          <p>{item.harga}</p>
          <p>{item.jadwal}</p>
          <p>{item.insruktor}</p>
          <p>{item.user}</p>
          <p>{item.kapasitas}</p>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
