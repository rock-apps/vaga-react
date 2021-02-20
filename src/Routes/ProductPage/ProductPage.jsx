import { useEffect, useState } from "react";
import RatingOutput from "../../components/RatingsOutput/RatingOutput";
import { products } from "../../data.json";
import "./ProductPage.css";

const ProductPage = (props) => {
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const curId = props.match.params.id;
    const currProduct = products.filter((item) => item.product_id == curId);
    setCurrentProduct(currProduct[0]);
  }, [props]);

  return (
    <>
      {currentProduct && (
        <div className="product-page">
          <img className="product-page__img" src={currentProduct.img} alt="" />
          <div className="product-page__product-info">
            <h2 className="product-page__title">{currentProduct.title}</h2>
            <p className="product-page__description">
              {currentProduct.description}
            </p>
            <p className="product-page__price">
              R${currentProduct.price.toFixed(2)}
            </p>
            <RatingOutput productRatings={currentProduct.rating} />
            <a href="#" className="btn btn-primary ">
              Add to cart
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
