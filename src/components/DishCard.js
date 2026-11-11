import React from "react";


function DishCard(props) {
  const dish = props.dish;

  return (
    <div className="dish-card">
      <img src={dish.image} alt={dish.name} />

      <div className="dish-info">
        <span className="category">{dish.category}</span>
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>

        <div className="dish-bottom">
          <span className="price">${dish.price.toFixed(2)}</span>
          <button className="btn" onClick={() => props.addToCart(dish)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
