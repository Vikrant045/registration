import React from 'react'

import Image from 'next/image';

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
        <Image
          src={product.category.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />

      
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {product.title}
        </h2>
        <p className="text-lg text-gray-600 font-semibold mb-3">
          ${product.price.toLocaleString()}
        </p>
        <p className="text-gray-700 text-sm mb-3">{product.description}</p>
        <div className="flex items-center mt-4">
          {/* <img
            src={product.category.image}
            alt={product.category.name}
            className="rounded-full mr-2"
          /> */}
 
          <span className="text-gray-600 text-sm font-medium">
            {product.category.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


<>

</>