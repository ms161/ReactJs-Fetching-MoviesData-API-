import React, { useEffect } from "react";
import { useRef } from "react";

import { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/filmss");

      console.log(response.ok);
      if (!response.ok) {
        console.log("fetchmovies handler is running");
        throw new Error("Something went wrong! ");
      }

      const data = await response.json(); //it will also return a promise

      const trasnformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(trasnformedMovies);
     
    } catch (error) {
      console.log("catch");
      setError(error.message);
    }
    setIsLoading(false);

    console.log(error, "this fetch movies button is running");
  }

  console.log(error, "before if condition");

  
 
  
  const onCancel = (e) => {
    console.log("clicked");
    // console.log(a)
    // clearInterval(a);
    setError(null);
    console.log("clearinterval is also running");
    console.log(e);
  };
  useEffect(()=>{
    let a
   console.log(error,'this is erorstate')
    if(error){

console.log('inside if condition')
    a = setInterval(() => {
        fetchMoviesHandler();
   
      }, 2000);
    }
console.log('useeffect is running')

    return ()=>  clearInterval(a)

    
      
      // console.log('clearinterval running')
    
  },[error])
  
  ///interval
  ///interval
  ///interval

  let content = <p>Found no Movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        <button onClick={onCancel}>Cancel</button>
      </section>
    </React.Fragment>
  );
}

export default App;
