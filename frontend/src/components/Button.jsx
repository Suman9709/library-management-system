import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 w-full sm:w-auto ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;