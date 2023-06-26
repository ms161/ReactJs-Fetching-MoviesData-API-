import React, { useState } from "react";

import classes from "./Form.module.css";
const Form = () => {
  const [text, setText] = useState();
  const [opening, setOpening] = useState();
  const [date, setDate] = useState();

  function texthandler(e) {
    setText(e.target.value);
   
  }
  function openingHandler(e) {
    setOpening(e.target.value);
  }
  function datehandler(e) {
    setDate(e.target.value);
    console.log(date);
  }
  let movieObj = {
    title: text,
    opening: opening,
    date: date,
  };

  function submitHandler(e) {
    e.preventDefault();
    console.log(movieObj);
  }
  return (
    <>
      <form action="" onSubmit={submitHandler}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ textAlign: "start" }} htmlFor="title">
            Title
          </label>
          <input
            onChange={texthandler}
            className={classes.title}
            type="text"
            id="title"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
          }}
        >
          <label style={{ textAlign: "start" }} htmlFor="opening">
            {" "}
            Opening text{" "}
          </label>
          <input
         onChange={openingHandler}
            className={classes.opening}
            type="text"
            id="opening"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
          }}
        >
          <label style={{ textAlign: "start" }} htmlFor="date">
            Release Date
          </label>
          <input
         onChange={datehandler}
            className={classes.date}
            type="text"
            id="date"
          />
        </div>
        <div style={{ marginTop: "1rem" }} type="submit">
          {" "}
          <button>Add movie</button>
        </div>
      </form>
    </>
  );
};

export default Form;
