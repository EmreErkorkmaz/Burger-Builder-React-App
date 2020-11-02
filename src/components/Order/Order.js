import React from "react";
import classes from "./Order.css";

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    // ingredient.push(
    //   "Ingredient: " +
    //     ingredientName +
    //     "Amount: " +
    //     props.ingredients[ingredientName]
    // );
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ingredient, index) => {
    return (
      <span
        key={index}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>{ingredientOutput}</p>
      <p>
        Price: <strong>{props.price.toFixed(2)}$</strong>
      </p>
    </div>
  );
};

export default order;
