import React from 'react';

function ShoeCard({ shoe }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{shoe.nama}</div>
        <p className="text-gray-700 text-base">Brand: {shoe.brand}</p>
        <p className="text-gray-700 text-base">Price: Rp.{shoe.harga}</p>
      </div>
    </div>
  );
}

export default ShoeCard;
