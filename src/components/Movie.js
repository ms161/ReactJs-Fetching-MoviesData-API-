import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  function sendId(){
    props.onId(props.id)
  }
  console.log(props.id,'this is id')
  return (
    <li className={classes.movie} style={{display:'flex' ,justifyContent:'space-between'}} >
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={sendId} style={{backgroundColor:'red'}}>Delete</button>
    </li>
  );
};

export default Movie;
