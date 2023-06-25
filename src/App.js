import React from "react";
import { useRef } from "react";

import { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState()

  async function fetchMoviesHandler() {
    setIsLoading(true)
    const response = await fetch("https://swapi.dev/api/films");
    setIsLoading(false)
    const data = await response.json();//it will also return a promise
    const trasnformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(trasnformedMovies); 
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <div >{isLoading?'Loading Data':''}  </div>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
