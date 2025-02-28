import { getAllProducts } from "@/data/products";
import Link from "next/link";

const ProductList: React.FC = () => {
  const products = getAllProducts();

  return (
    <div className="min-h-screen  flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6">상품 목록</h1>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="group">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition transform group-hover:scale-105 group-hover:shadow-lg">
              <p className="text-5xl">{product.image}</p>
              <p className="text-xl font-semibold mt-3">{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
