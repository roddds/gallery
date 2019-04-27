import React from "react";
import "./button.css";

function Button(props) {
  const { direction, ...rest } = props;

  return (
    <button {...rest}>
      <span class={props.direction} />
    </button>
  );
}

export default Button;
