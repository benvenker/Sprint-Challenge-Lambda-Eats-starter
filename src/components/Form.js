import React from "react";

const Form = () => {
  const handleSubmit = () => {};
  return (
    <div className="form-container">
      <h1>Build Your Own Pizza</h1>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
};

export default Form;
