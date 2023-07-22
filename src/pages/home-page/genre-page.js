import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

function GenrePage({ setComp, setPrev, genre, setId }) {
  const gotoMain = () => {
    setPrev("main");
    setComp("main");
  };

  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [i, setI] = useState(0);
  const [length, setLength] = useState();
  const movieNameRef = useRef();

  const genre_name = genre.toLowerCase().replace("_", "");

  useEffect(() => {
    fetch("https://engine-rqrw.onrender.com/get_genre_movies/" + genre_name)
      .then((res) => res.json())
      .then((data) => {
        setLength(data.length);
        setAllMovies(data);
      });
  }, [genre_name]);

  useEffect(() => {
    setMovies([...allMovies].slice(i, i + 24));
  }, [i, allMovies]);

  const increment = () => {
    setI(i + 24);
  };

  const decrement = () => {
    setI(i - 24);
  };

  const gotoSearch = debounce(() => {
    var search = movieNameRef.current.value;
    if (search !== "") {
      const searchMovies = allMovies.filter((movie) => {
        const title = movie["title"].toLowerCase();
        return title.includes(search.toLowerCase());
      });
      setMovies(searchMovies);
      setI(0);
      setLength(searchMovies.length);
    } else {
      setMovies([...allMovies].slice(0, 24));
      setI(0);
      setLength(allMovies.length);
    }
  }, 500);

  const gotoMoviePage = (id) => {
    setId(id);
    setPrev("genrePage");
    setComp("moviePage");
  };

  return (
    <div className="genre-page">
      <div style={{ display: "flex" }}>
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          className="back"
          onClick={gotoMain}
        />
        <span className="genre-page-title" style={{ flex: "1" }}>
          &nbsp;&nbsp;{genre.replace("_", " ")}
        </span>
        <input
          ref={movieNameRef}
          type="text"
          className="searchMovieInput"
          placeholder="Search movie..."
          onInput={gotoSearch}
        />
      </div>
      <div className="movies">
        {movies.map((movie, index) => (
          <div
            key={movie["id"]}
            className="movie-card"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie["poster"]})`,
            }}
            onClick={() => {
              gotoMoviePage(movie["id"]);
            }}
          >
            {movie["poster"] === "" ? (
              <div className="movie-name">{movie["title"]}</div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="footer">
        {i !== 0 ? (
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            className="prev"
            onClick={decrement}
          />
        ) : (
          <div></div>
        )}
        {i + 24 < length ? (
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            className="next"
            onClick={increment}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default GenrePage;
