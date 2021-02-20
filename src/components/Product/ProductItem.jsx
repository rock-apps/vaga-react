import RatingOutput from "../RatingsOutput/RatingOutput";
import "./ProductItem.css";

const Product = ({ product }) => {
  return (
    <a href="">
      <div className="card" style={{ width: "15rem" }}>
        <i class="lni lni-heart-filled card-wish-list"></i>
        <img src={product.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
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
          <a href="#" className="btn btn-primary ">
            Add to cart
          </a>
        </div>
      </div>
    </a>
  );
};

export default Product;
