import React from "react";
import classes from "./Spinner.css";

const spinner = (props) => <div className={classes.Loader}>{props.text}</div>;

export default spinner;
