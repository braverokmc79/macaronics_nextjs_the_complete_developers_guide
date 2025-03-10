const products = [
  {
    id: "1",
    image: "⌚",
    name: "시계",
    details: "가격: 1,560,000원"
  },
  {
    id: "2",
    image: "🥒",
    name: "오이",
    details: "2kg에 4,500원"
  },
  {
    id: "3",
    image: "💻",
    name: "노트북",
    details: "할부 없이 2,300,000원"
  }
];


export const getAllProducts = () => {
  return products;
}

export const getProductById = (id) => {
  const found = products.find(product => product.id === id);
  return found;
}