import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import RatingOutput from "../../components/RatingsOutput/RatingOutput";
import { products } from "../../data.json";
import "./ProductPage.css";

const ProductPage = (props) => {
  const { addToCart } = props;
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
            <button
              className="btn btn-primary"
              onClick={() => addToCart(currentProduct)}
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(ProductPage);
