import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Toggle.css";
import "./Form.css";
import Toggle from "react-toggle";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
  const history = useHistory();

  const initialState = {
    name: "",
    size: "medium",
    sauce: "original-red",
    glutenFree: false,
    "canadian-bacon": "",
    pepperoni: false,
    sausage: false,
    selectedSauce: "original-red",
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
    "canadian-bacon": yup.bool(),
    pepperoni: yup.bool(),
    sausage: yup.bool(),
    "spicy-italian-sausage": yup.bool(),
    chicken: yup.bool(),
    glutenFree: yup.bool(),
    size: yup.string().required(),
    selectedSauce: yup.string(),
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

  const handleRadioChange = (e) => {
    e.persist();
    console.log("cliked", e.target.value);
    setFormState({ ...formState, selectedSauce: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => setPost([response.data]))
      .then(setFormState(initialState))
      // .then(history.push("/success"))
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
          <p>Choose up to n</p>
        </div>
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
