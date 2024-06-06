import React from "react";
import { useNavigate } from "react-router-dom";

function ShoeCard({ shoe }) {
  const navigate = useNavigate();
  return (
    <div
      className="max-w-sm rounded overflow-hidden bg-white outline-gray-700 outline-4 outline"
      onClick={() => {
        navigate(`/info/${shoe.nama}`);
      }}
    >
      <div className="px-6 py-4">
        <img src={shoe.gambar} />
        <div className="font-bold text-xl mb-2">{shoe.nama}</div>
        <p className="text-gray-700 text-base">Brand: {shoe.brand}</p>
        <p className="text-gray-700 text-base">Price: IDR {shoe.harga}</p>
      </div>
    </div>
  );
}

export default ShoeCard;
