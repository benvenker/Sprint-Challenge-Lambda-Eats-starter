import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Toggle.css";
import "./Form.css";
import Toggle from "react-toggle";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
  const initialState = {
    name: "",
    size: "medium",
    glutenFree: false,
    toppings: [],
    selectedSauce: "original-red",
    quantity: 1,
    "special-instructions": "",
  };
  const [errors, setErrors] = useState(initialState);
  const [formState, setFormState] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [post, setPost] = useState([]);

  const schema = yup.object().shape({
    name: yup
      .string()
      .test(
        "len",
        "Name must be at least two characters long.",
        (val) => val.length >= 2
      ),
    toppings: yup.array(),
    glutenFree: yup.bool(),
    size: yup.string().required(),
    selectedSauce: yup.string(),
    "special-instructions": yup.string(),
    quantity: yup.number(),
  });

  const validateInput = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  useEffect(() => {
    schema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState, schema]);

  const handleChange = (e) => {
    e.persist();
    let value =
      e.target.type === "number"
        ? (e.target.value = Number(e.target.value))
        : e.target.value;
    const newFormState = {
      ...formState,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : value,
    };
    validateInput(e);
    setFormState(newFormState);
  };

  const handleRadioChange = (e) => {
    e.persist();
    setFormState({ ...formState, selectedSauce: e.target.value });
  };

  const handleToppings = (e) => {
    e.persist();
    const topping = e.target.name;
    const toppings = formState.toppings;

    // if the topping doesn't exist, add it
    if (e.target.checked && !toppings.includes(topping)) {
      toppings.push(topping);
      setFormState({ ...formState });

      // if it already exists/you unchecked it, remove it
    } else if (!e.target.checked && toppings.includes(topping)) {
      toppings.splice(toppings.indexOf(topping), 1);
      setFormState({ ...formState });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => setPost([response.data]))
      .then(setFormState(initialState))
      .then(document.getElementById("form").reset())
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="form-container">
      <h1>Build Your Own Pizza</h1>
      <form id="form" onSubmit={handleSubmit}>
        <label htmlFor="name" id="name" name="name">
          <h2>Name</h2>
          <input
            type="text"
            id="name"
            cy-data="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </label>
        <label htmlFor="size" name="size" id="size">
          <div className="section-header">
            <h2>Choice of Size</h2>
            <p>Required</p>
          </div>
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
        <div className="section-header">
          <h2>Choice of Sauce</h2>
          <p>Required</p>
        </div>
        <label htmlFor="original-red" name="original-red" id="original-red">
          <input
            type="radio"
            name="original-red"
            checked={formState.selectedSauce === "original-red"}
            onChange={handleRadioChange}
          />
          Original Red
        </label>
        <label htmlFor="garlic-ranch" name="garlic-ranch" id="garlic-ranch">
          <input
            type="radio"
            name="garlic-ranch"
            value="garlic-ranch"
            checked={formState.selectedSauce === "garlic-ranch"}
            onChange={handleRadioChange}
          />
          Garlice Ranch
        </label>
        <label htmlFor="bbq-sauce" name="bbq-sauce" id="bbq-sauce">
          <input
            type="radio"
            name="bbq-sauce"
            value="bbq-sauce"
            checked={formState.selectedSauce === "bbq-sauce"}
            onChange={handleRadioChange}
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
            value="spinach-alfredo"
            checked={formState.selectedSauce === "spinach-alfredo"}
            onChange={handleRadioChange}
          />
          Spinach Alfredo
        </label>
        <div className="section-header">
          <h2>Add Toppings</h2>
          <p>Choose up to 5</p>
        </div>
        <label htmlFor="pepperoni">
          <input
            type="checkbox"
            id="pepperoni"
            name="pepperoni"
            cy-data="pepperoni"
            onChange={handleToppings}
          />
          Pepperoni
        </label>
        <label htmlFor="sausage">
          <input
            type="checkbox"
            id="sausage"
            name="sausage"
            cy-data="sausage"
            onChange={handleToppings}
          />
          Sausage
        </label>
        <label htmlFor="canadian-bacon">
          <input
            type="checkbox"
            id="canadian-bacon"
            name="canadian-bacon"
            cy-data="canadian-bacon"
            onChange={handleToppings}
          />
          Canadian Bacon
        </label>
        <label htmlFor="spicy-italian-sausage">
          <input
            type="checkbox"
            id="spicy-italian-sausage"
            name="spicy-italian-sausage"
            onChange={handleToppings}
          />
          Spicy Italian Sausage
        </label>
        <label htmlFor="grilled-chicken">
          <input
            type="checkbox"
            id="grilled-chicken"
            name="grilled-chicken"
            onChange={handleToppings}
          />
          Chicken
        </label>
        <div className="section-header">
          <h2>Choice of Substitute</h2>
        </div>
        <label htmlFor="glutenFree">
          <Toggle
            name="glutenFree"
            id="glutenFree"
            defaultChecked={formState.glutenFree}
            onChange={handleChange}
          />
          <div className="glutenfree">Gluten free crust</div>
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
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formState.quantity}
            onChange={handleChange}
          />
        </div>
        <button disabled={buttonDisabled}>PLace Your Order</button>
      </form>
      {
        // console.log("post.length: ", post.length)
        post ? <pre>{JSON.stringify(post, null, 2)}</pre> : null
      }
    </div>
  );
};

export default Form;
