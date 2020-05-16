import React, { useEffect, useState } from "react";
import "./Toggle.css";
import Toggle from "react-toggle";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
  const initialState = {
    name: "",
    size: "medium",
    sauce: "original-red",
    glutenFree: false,
    "canadian-bacon": "",
    pepperoni: "",
    sausage: "",
  };

  const [errors, setErrors] = useState(initialState);
  const [formState, setFormState] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [post, setPost] = useState([]);

  const schema = yup.object().shape({
    name: yup.string().required("Name must be at least two characters long."),
    "canadian-bacon": yup.bool(),
    pepperoni: yup.bool(),
    sausage: yup.bool(),
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
    validateInput(e);
    setFormState(newFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => setPost([response.data]))
      .then(setFormState(initialState))
      .catch((err) => console.log(err.respose));
  };

  return (
    <div className="form-container">
      <h1>Build Your Own Pizza</h1>
      <form onSubmit={handleSubmit}>
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
            value="garlic-ranch"
            onChange={handleChange}
          />
          Garlice Ranch
        </label>
        <label htmlFor="bbq-sauce" name="bbq-sauce" id="bbq-sauce">
          <input
            type="radio"
            name="bbq-sauce"
            value="bbq-sauce"
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
            valeu="spinach-alfredo"
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
            cy-data="pepperoni"
            onChange={handleChange}
          />
          Pepperoni
        </label>
        <label htmlFor="sausage">
          <input
            type="checkbox"
            id="sausage"
            name="sausage"
            cy-data="sausage"
            onChange={handleChange}
          />
          Sausage
        </label>
        <label htmlFor="canadian-bacon">
          <input
            type="checkbox"
            id="canadian-bacon"
            name="canadian-bacon"
            cy-data="canadian-bacon"
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
          <input
            type="number"
            name="quantity"
            id="quantity"
            onChange={handleChange}
          />
        </div>
        <button>PLace Your Order</button>
      </form>
      {
        // console.log("post.length: ", post.length)
        post ? <pre>{JSON.stringify(post, null, 2)}</pre> : null
      }
    </div>
  );
};

export default Form;
