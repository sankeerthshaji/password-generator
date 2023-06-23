import React from "react";

function Button(props) {
  return (
    <button
      className="bg-blue-100 text-blue-900 p-2 sm:py-2 sm:px-6 rounded text-xl lg:ml-16"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;