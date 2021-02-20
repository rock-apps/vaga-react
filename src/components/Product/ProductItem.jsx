import { Link } from "react-router-dom";
import RatingOutput from "../RatingsOutput/RatingOutput";
import "./ProductItem.css";

const Product = ({ product, addToCart }) => {
  return (
    <div className="card" style={{ width: "15rem" }}>
      <i className="lni lni-heart-filled card-wish-list"></i>
      <Link to={"/" + product.product_id}>
        <img src={product.img} className="card-img-top" alt="..." />
      </Link>
      <div className="card-body">
        <Link to={"/" + product.product_id}>
          <h5 className="card-title">{product.title}</h5>
        </Link>

        {product.descount ? (
          <div>
            <p>
              <span className="old-price">De R$ {product.price}</span>
              <span> - {product.descount * 100}% off</span>
            </p>

            <p className="current-price">
              R$
              {(product.price - product.price * product.descount).toFixed(2)}
            </p>
          </div>
        ) : (
          <p className="current-price">R$ {product.price.toFixed(2)}</p>
        )}
        <RatingOutput productRatings={product.rating} />
        <button className="btn btn-primary" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
