import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import MoviesList from "./components/MoviesList";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/films");

      console.log(!response.ok);
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
  useEffect(() => {
    fetchMoviesHandler()
    let a;
    console.log(error, "this is erorstate");
    if (error) {
      console.log("inside if condition");
      a = setInterval(() => {
        fetchMoviesHandler();
      }, 2000);
    }
    console.log("useeffect is running");

    return () => clearInterval(a);

    // console.log('clearinterval running')
  }, [error]);

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
      <section style={{display:'flex' ,justifyContent:'center',alignItems:'center' ,flexDirection:'column'}} >
       {useMemo(()=>  <Form></Form>,[])}
      
      
      </section>
      <section>
        {content}
        <button onClick={onCancel}>Cancel</button>
      </section>
    </React.Fragment>
  );
}

export default App;
