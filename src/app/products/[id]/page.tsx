"use client";

import { getProductById } from "@/data/products";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);

  if (!product) return <p className="text-center text-lg mt-10">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <h2 className="text-4xl font-bold mb-6">상품 상세보기</h2>
      <div className="bg-gray-100 p-10 rounded-lg shadow-md text-center max-w-lg w-full">
        <p className="text-6xl">{product.image}</p>
        <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-700 mt-3">{product.details}</p>
        <Link 
          href={`/products/${id}/checkout`}
          className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold transition hover:bg-gray-800"
        >
          구매하기
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
