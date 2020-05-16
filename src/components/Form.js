import React, { useEffect, useState } from "react";
import "./Toggle.css";
import Toggle from "react-toggle";
import * as yup from "yup";

const Form = () => {
  const initialState = {
    name: "",
    size: "medium",
    glutenFree: false,
  };

  const [errors, setErrors] = useState(initialState);
  const [formState, setFormState] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
  });

  const validateInput = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.nname]: err.errors[0] });
      });
  };

  useEffect(() => {
    schema.isValid(formState).then((valid) => {
      setButtonDisabled(valid);
    });
  }, [formState]);

  const handleChange = (e) => {
    e.persist();
    const newFormState = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    return setFormState(newFormState);
  };
  const handleSubmit = () => {};

  return (
    <div className="form-container">
      <h1>Build Your Own Pizza</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" id="name" name="name">
          <h2>Name</h2>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </label>
        <label htmlFor="size" name="size" id="size">
          <h2>Choice of Size</h2>
          <p>Required</p>
          <select
            name="size"
            id="size"
            value={formState.size}
            onChange={handleChange}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="Large">Large</option>
            <option value="extra large">Extra Large</option>
          </select>
        </label>
        <h2>Choice of Sauce</h2>
        <p>Required</p>
        <label htmlFor="original-red" name="original-red" id="original-red">
          <input
            type="radio"
            name="original-red"
            checked={true}
            onChange={handleChange}
          />
          Original Red
        </label>
        <label htmlFor="garlic-ranch" name="garlic-ranch" id="garlic-ranch">
          <input
            type="radio"
            name="garlic-ranch"
            checked={false}
            onChange={handleChange}
          />
          Garlice Ranch
        </label>
        <label htmlFor="bbq-sauce" name="bbq-sauce" id="bbq-sauce">
          <input
            type="radio"
            name="bbq-sauce"
            checked={false}
            onChange={handleChange}
          />
          BBQ Sauce
        </label>
        <label
          htmlFor="spinach-alfredo"
          name="spinach-alfredo"
          id="spinach-alfredo"
        >
          <input
            type="radio"
            name="spinach-alfredo"
            checked={false}
            onChange={handleChange}
          />
          Spinach Alfredo
        </label>
        <h2>Add Toppings</h2>
        <p>Choose up to n</p>
        <label htmlFor="pepperoni">
          <input
            type="checkbox"
            id="pepperoni"
            name="pepperoni"
            onChange={handleChange}
          />
          Pepperoni
        </label>
        <label htmlFor="sausage">
          <input
            type="checkbox"
            id="sausage"
            name="sausage"
            onChange={handleChange}
          />
          Sausage
        </label>
        <label htmlFor="canadian-bacon">
          <input
            type="checkbox"
            id="canadian-bacon"
            name="canadian-bacon"
            onChange={handleChange}
          />
          Canadian Bacon
        </label>
        <label htmlFor="spicy-italian-sausage">
          <input
            type="checkbox"
            id="spicy-italian-sausage"
            name="spicy-italian-sausage"
            onChange={handleChange}
          />
          Spicy Italian Sausage
        </label>
        <label htmlFor="grilled-chicken">
          <input
            type="checkbox"
            id="grilled-chicken"
            name="grilled-chicken"
            onChange={handleChange}
          />
          Chicken
        </label>
        <h2>Choice of Substitute</h2>
        <label htmlFor="glutenFree">
          <Toggle
            name="glutenFree"
            id="glutenFree"
            defaultChecked={formState.glutenFree}
            onChange={handleChange}
          />
          <span>Gluten free crust</span>
        </label>
        <h2>Special Instructions</h2>
        <textarea
          name="special-instructions"
          id="special-instructionis"
          cols="30"
          rows="2"
          onChange={handleChange}
        ></textarea>
        <div className="quantity">
          <input type="number" onChange={handleChange} />
        </div>
        <button>PLace Your Order</button>
      </form>
    </div>
  );
};

export default Form;
