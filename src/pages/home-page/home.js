import React, { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Genres from "./genres";
import GenrePage from "./genre-page";
import MoviePage from "./movie-page";
import { auth, getMoviesInList } from "../../auth";

function Home() {
  const [comp, setComp] = useState("main");
  const [genre, setGenre] = useState();
  const [id, setId] = useState();
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const movieNameRef = useRef();
  const [prev, setPrev] = useState("main");
  const [recs, setRecs] = useState();
  const [error, setError] = useState(false);
  const [Loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    setMovies([]);
    setRecs([]);
    if (user) {
    }
    if (user) {
      getMoviesInList(user?.email).then((list) => {
        const k = 10;
        var data = "";
        for (let i = 0; i < list.length; i++) {
          if (i === list.length - 1) {
            data += list[list.length - 1 - i]["id"];
            break;
          }
          data += list[list.length - 1 - i]["id"] + "|";
        }
        fetch(
          `https://engine-rqrw.onrender.com/get_recommendations/${k}/${data}`
        )
          .then((res) => res.json())
          .then((res) => {
            setRecs(res);
          });
        setLoading(false);
      });
    }

    fetch("https://engine-rqrw.onrender.com/get_all_movies")
      .then((res) => res.json())
      .then((data) => {
        setAllMovies(data);
      });
  }, [comp, user]);

  const gotoSearch = debounce(() => {
    var search = movieNameRef.current.value;
    if (search !== "") {
      const searchMovies = allMovies.filter((movie) => {
        const title = movie["title"].toLowerCase();
        return title.includes(search.toLowerCase());
      });
      setMovies(searchMovies);
      if (!searchMovies.length) {
        setError(true);
      }
    } else {
      setMovies([]);
      setError(false);
    }
  }, 500);

  const gotoMoviePage = (id) => {
    setId(id);
    setComp("moviePage");
  };

  return (
    <>
      {comp === "main" ? (
        <>
          <div align="center">
            <div className="search">
              <input
                ref={movieNameRef}
                type="text"
                className="searchInput"
                placeholder="Search movie..."
                onInput={gotoSearch}
              />
            </div>
          </div>
          {movies.length ? (
            <div
              className="genre-page-title"
              style={{ color: "rgb(192, 192, 192)" }}
            >
              Search Results
            </div>
          ) : (
            ""
          )}
          {error ? (
            <div align="center">
              <div className="no-movie-found" align="center">
                No movies found
              </div>
            </div>
          ) : (
            ""
          )}
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
          <div
            className="genre-page-title"
            style={{ color: "rgb(192, 192, 192)" }}
          >
            Recommendations
          </div>
          {!user ? (
            <div align="center">
              <div className="no-movie-found" align="center">
                Login / Signup to use recommender
              </div>
            </div>
          ) : (
            ""
          )}
          {Loading && user ? (
            <div align="center">
              <div
                className="no-movie-found"
                style={{ margin: "105px" }}
                align="center"
              >
                Loading...
              </div>
            </div>
          ) : (
            ""
          )}
          {!recs?.length && !Loading && user ? (
            <div align="center">
              <div
                className="no-movie-found"
                style={{ margin: "105px" }}
                align="center"
              >
                Add movies to get recommendations
              </div>
            </div>
          ) : (
            ""
          )}
          {recs?.length ? (
            <div className="scroll">
              <div className="recs">
                {recs?.map((movie, index) => (
                  <span
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
                  </span>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          <div
            className="genre-page-title"
            style={{ color: "rgb(192, 192, 192)" }}
          >
            Genres
          </div>
          <Genres setComp={setComp} setGenre={setGenre} />
        </>
      ) : comp === "genrePage" ? (
        <GenrePage
          setComp={setComp}
          setPrev={setPrev}
          genre={genre}
          setId={setId}
        />
      ) : comp === "moviePage" ? (
        <MoviePage setComp={setComp} prev={prev} id={id} />
      ) : (
        ""
      )}
    </>
  );
}

export default Home;
