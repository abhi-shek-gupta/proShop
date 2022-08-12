import React from "react";
import PropTypes from "prop-types";

const ratingArry = [1, 2, 3, 4, 5];
const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {ratingArry.map((e) => (
        <span key={e}>
          <i
            style={{ color }}
            className={
              value >= e
                ? "fas fa-star"
                : value >= e - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.prototypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Rating;
