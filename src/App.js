import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://moviesapi-8f934-default-rtdb.firebaseio.com/movies.json"
      );

      console.log(response.ok);
      if (!response.ok) {
        console.log("fetchmovies handler is running");
        throw new Error("Something went wrong! ");
      }

      const data = await response.json(); //it will also return a promise
      console.log(data);

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      console.log(loadedMovies, "this is loaded movies");
      setMovies(loadedMovies);
      console.log("");
    } catch (error) {
      console.log("catch");
      setError(error.message);
    }

    setIsLoading();

    console.log(error, "this fetch movies button is running");
    setIsLoading(false)
  }

  console.log(error, "before if condition");

  const onCancel = (e) => {
    console.log("clicked");
    // console.log(a)
    // clearInterval(a)
    setError(null);
    console.log("clearinterval is also running");
    console.log(e);
  };
  useEffect(() => {
    fetchMoviesHandler();
    // let a;
    // console.log(error, "this is erorstate");
    // if (error) {
    //   console.log("inside if condition");
    //   a = setInterval(() => {
    //     fetchMoviesHandler();
    //   }, 2000);
    // }
    // console.log("useeffect is running");

    // return () => clearInterval(a);

    // console.log('clearinterval running')
  }, []);

  ///interval
  ///interval
  ///interval

  let content = <p>Found no Movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onId={deleteItem} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  //adding new movies
  //adding new movies
  //adding new movies
  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://moviesapi-8f934-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data=await response.json()
    console.log(data,'this is added movie ')
    fetchMoviesHandler()
  }
  //deleting movies form backned and ui
  //deleting movies form backned and ui
  //deleting movies form backned and ui
  async function deleteItem(id) {
    const response = await fetch(
      `https://moviesapi-8f934-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      }
    );
    const data =await response.json();
    console.log(data, "this is deleted response");

    let updatedMovies = movies.filter((ele) => {//
      return ele.id !== id;
    });
    setMovies(updatedMovies);
    // fetchMoviesHandler()
    
   
  }
  return (
    <React.Fragment>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        {content}
        <button onClick={onCancel}>Cancel</button>
      </section>
    </React.Fragment>
  );
}

export default App;
