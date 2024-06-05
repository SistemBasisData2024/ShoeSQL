import React from "react";
import { useNavigate } from "react-router-dom";

function ShoeCard({ shoe }) {
  const navigate = useNavigate();
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg"
      onClick={() => {
        console.log(`This is ${shoe.id_sepatu}`);
        navigate(`/shoes/${shoe.id_sepatu}`);
      }}
    >
      <div className="px-6 py-4">
        <img src={shoe.gambar} />
        <div className="font-bold text-xl mb-2">{shoe.nama}</div>
        <p className="text-gray-700 text-base">Brand: {shoe.brand}</p>
        <p className="text-gray-700 text-base">Price: Rp.{shoe.harga}</p>
      </div>
    </div>
  );
}

export default ShoeCard;
