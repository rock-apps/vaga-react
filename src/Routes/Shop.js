import Product from "../components/Product/ProductItem";

const Shop = ({ products }) => {
  return (
    <div className="products-list container mt-5 d-flex flex-wrap justify-content-between">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Shop;
