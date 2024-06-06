import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InfoSepatu() {
  const { id_sepatu } = useParams();
  const [gambar, setGambar] = useState("");
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [size, setSize] = useState([]);
  const [index, setIndex] = useState(0);
  const [jumlah, setJumlah] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/shoes/${id_sepatu}`)
      .then((res) => {
        const sepatu = res.data;
        setGambar(sepatu.gambar);
        setNama(sepatu.nama);
        setHarga(sepatu.harga);
        setSize(sepatu.size);
        setJumlah(sepatu.jumlah);
        console.log(res);
        console.log(res.data.gambar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex">
        <div className="max-w-sm">
          <img src={gambar} />
        </div>
        <div className="bg-gray-500 p-5 rounded-lg">
          <div className="bg-white rounded-lg p-3 text-left">
            <p className="font-bold">{nama}</p>
            <p className="font-semibold">IDR {harga} </p>
            <p></p>
          </div>
          <div className="flex justify-between mt-2">
            {size.map((item, id) => (
              <div
                className={
                  id == index
                    ? "bg-blue-700 rounded-lg w-10 m-2"
                    : "bg-white rounded-lg w-10 m-2"
                }
                onClick={() => {
                  setIndex(id);
                }}
              > 
                <button className="m-1">{item}</button>
              </div>
            ))}
            {/* <div className="bg-white rounded-lg">
              <button className="m-1">{size[0]}</button>
            </div>
            <div className="bg-white rounded-lg">
              <button className="m-1">{size[1]}</button>
            </div>
            <div className="bg-white rounded-lg">
              <button className="m-1">{size[2]}</button>
            </div>
            <div className="bg-white rounded-lg">
              <button className="m-1">{size[3]}</button>
            </div>
            <div className="bg-white rounded-lg">
              <button className="m-1">{size[4]}</button>
            </div> */}
          </div>
          <div className="mt-2 bg-white rounded-lg p-3 text-left">
            <p className="font-bold">Available : {jumlah[index]}</p>
          </div>
          <button className="mt-2 bg-white rounded-lg p-3 text-left">
            <button className="font-bold">BUY</button>
          </button>
        </div>
      </div>
    </>
  );
}

export default InfoSepatu;
