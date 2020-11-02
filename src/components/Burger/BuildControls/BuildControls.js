import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <h1>
      Total Price: <strong>{props.price.toFixed(2)}$</strong>
    </h1>
    {controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]}
      ></BuildControl>
    ))}
    <button className={classes.OrderButton} onClick={props.ordered} disabled={!props.purchaseable}>{props.isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}</button>
  </div>
);

export default buildControls;
