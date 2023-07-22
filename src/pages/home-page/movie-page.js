import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import {
  addMovieInList,
  auth,
  deleteMovieInList,
  DeleteUser,
  getMoviesInList,
} from "../../auth";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjM3ZTBlM2Y3MTIyMjZmMTU2NGVlYmYxMmI0M2NkMCIsInN1YiI6IjY0NjhlZmEwYTUwNDZlMDEwNThiODE1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.alUd9uwTSKexLHpCYStx3BzTO9x1pdFCIGV4cKPkv1o",
  },
};

function MoviePage({ setComp, prev, id, change, setChange }) {
  const [loading, setLoading] = useState("true");
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [backdrop, setBackdrop] = useState(false);
  const [added, setAdded] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      getMoviesInList(user.email).then((list) => {
        for (const movie of list) {
          if (movie["id"] === id) {
            setAdded(true);
            break;
          }
        }
      });
    }

    var url = "https://api.themoviedb.org/3/movie/" + id;
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
      })
      .catch(() => setLoading("error"));
    url = "https://api.themoviedb.org/3/movie/" + id + "/credits";
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setCast(res["cast"].splice(0, 10));
        const director = res["crew"].find(
          (member) => member.job === "Director"
        );
        setDirector([director]);
        setLoading("false");
      });
  }, [user, id]);

  const gotoMain = () => {
    setComp(prev);
  };

  function formatBudget(budgetInDollars) {
    if (budgetInDollars >= 1000000000) {
      return (budgetInDollars / 1000000000).toFixed(2) + " billion";
    } else if (budgetInDollars >= 1000000) {
      return (budgetInDollars / 1000000).toFixed(0) + " million";
    } else {
      return budgetInDollars.toLocaleString() + " dollars";
    }
  }

  const addMovie = (movie) => {
    const email = user.email;
    const id = movie["id"];
    const poster = movie["poster_path"];
    const title = movie["original_title"];
    addMovieInList(email, id, title, poster).then(() => {
      setAdded(true);
    });
  };

  const deleteMovie = (movie) => {
    const email = user.email;
    const id = movie["id"];
    const poster = movie["poster_path"];
    const title = movie["original_title"];
    deleteMovieInList(email, id, title, poster).then(() => {
      if (prev === "list") {
        setChange(!change);
        setComp("list");
      }
      setAdded(false);
      return;
    });
  };

  return (
    <>
      {loading === "false" ? (
        <>
          <FontAwesomeIcon
            className="go-back"
            icon={faArrowCircleLeft}
            onClick={gotoMain}
          />
          <div className="movie-page">
            {user && added ? (
              <FontAwesomeIcon
                className="added-movie"
                icon={faTrash}
                onClick={() => deleteMovie(movie)}
              />
            ) : user && !added ? (
              <FontAwesomeIcon
                className="add-movie"
                icon={faPlusCircle}
                onClick={() => addMovie(movie)}
              />
            ) : (
              ""
            )}

            <img
              className="back-drop"
              onLoad={() => {
                setBackdrop(true);
              }}
              src={
                "https://image.tmdb.org/t/p/original" + movie["backdrop_path"]
              }
              alt=""
            />
            {backdrop ? (
              <img
                className="poster"
                src={
                  "https://image.tmdb.org/t/p/original" + movie["poster_path"]
                }
                alt=""
              />
            ) : (
              ""
            )}

            <div className="details">
              <div className="title" align="center">
                {movie["original_title"]}
                <div style={{ fontSize: "15px" }}>{movie["tagline"]}</div>
              </div>
              <div className="overview" align="left">
                <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                  Overview
                </div>
                <div>{movie["overview"]}</div>
              </div>
              <div className="sub-details">
                <div className="overview" align="left">
                  <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                    Genres
                  </div>
                  <div>
                    {movie["genres"]?.map((genre) => (
                      <span>{genre["name"].replace(" ", "-")} </span>
                    ))}
                  </div>
                </div>
                <div className="overview" align="left">
                  <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                    Release date
                  </div>
                  <div>{movie["release_date"]}</div>
                </div>
                <div className="overview" align="left">
                  <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                    Runtime
                  </div>
                  <div>{movie["runtime"]}mins</div>
                </div>
                {movie["budget"] ? (
                  <div className="overview" align="left">
                    <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                      Budget
                    </div>
                    <div>{formatBudget(movie["budget"])} USD</div>
                  </div>
                ) : (
                  ""
                )}
                {movie["revenue"] ? (
                  <div className="overview" align="left">
                    <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                      Revenue
                    </div>
                    <div>{formatBudget(movie["revenue"])} USD</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="overview">
                <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                  Director
                </div>
                <div style={{ display: "inline-block" }}>
                  <img
                    style={{ margin: "10px" }}
                    className="actor-image"
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      director[0]["profile_path"]
                    }
                    alt=""
                  />
                  <div align="center">{director[0]["name"]}</div>
                </div>
              </div>
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                color: "rgb(192, 192, 192)",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              Top cast
            </div>
            <div className="cast-details" align="left">
              {cast?.map((actor) => (
                <div className="actor" align="center">
                  <img
                    style={{ margin: "10px" }}
                    className="actor-image"
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      actor["profile_path"]
                    }
                    alt=""
                  />
                  <div>
                    <span>{actor["original_name"]}</span>
                    <div style={{ margin: "-10px" }}>as</div>
                    <i style={{ fontSize: "12px" }}>{actor["character"]}</i>
                  </div>
                </div>
              ))}
            </div>
            {movie["belongs_to_collection"] ? (
              <div className="overview">
                <div style={{ fontWeight: "bold", fontSize: "30px" }}>From</div>
                <div style={{ display: "inline-block" }}>
                  <img
                    className="from"
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      movie["belongs_to_collection"]["backdrop_path"]
                    }
                    alt=""
                  />
                  <div align="center">
                    {movie["belongs_to_collection"]["name"]}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {movie["homepage"] ? (
              <div className="overview" align="left">
                <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                  Home page
                </div>
                <a
                  href={movie["homepage"]}
                  className="home-page"
                  rel="noreferrer"
                  target="_blank"
                >
                  {movie["homepage"]}
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <div className="loading" align="center">
          <span className="load">Loading...</span>
        </div>
      )}
    </>
  );
}

export default MoviePage;
