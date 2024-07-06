import React from "react";
import { Cryptocurrency } from '../interfaces/Cryptocurrency';


const CardComponent: React.FC<{ cryptocurrency: Cryptocurrency }> = ({ cryptocurrency }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 mb-2 hover:bg-gray-100">
    <div className="text-sm text-gray-600">ID: {cryptocurrency.id}</div>
    <div className="text-lg font-semibold text-gray-800">{cryptocurrency.name} : {cryptocurrency.symbol}</div>
    <div className="text-md text-gray-700">Price [{cryptocurrency.price}] USD</div>
  </div>
  );
};

export default CardComponent;