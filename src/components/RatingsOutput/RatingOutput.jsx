import { useEffect, useState } from "react";
import "./RatingsOutput.css";

const RatingOutput = ({ productRatings }) => {
  const [ratingsAmount, setRatingsAmount] = useState(0);
  const [ratingsAverage, setRatingsAverage] = useState(0);

  useEffect(() => {
    if (productRatings) {
      setRatingsAmount(productRatings.amount);
      setRatingsAverage(productRatings.average);
    }
  }, [productRatings]);

  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <div className="star-box star-box-star-1">
        <i
          className={`output-star lni lni-star-filled ${
            ratingsAverage > 0 && i <= ratingsAverage ? "star-active" : ""
          }`}
        ></i>
      </div>
    );
  }

  return (
    <div className="rating-output">
      <div className="rating-output-stars">{stars}</div>
      <p>{ratingsAmount}</p>
    </div>
  );
};

export default RatingOutput;
