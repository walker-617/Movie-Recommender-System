import React, { useEffect, useState } from "react";

import { auth, getMoviesInList } from "../../auth";
import MoviePage from "./movie-page";
import GotoLogin from "./reuse/goto-login";

function List() {
  const user = auth.currentUser;

  const [list, setList] = useState([]);
  const [comp, setComp] = useState("list");
  const [id, setId] = useState();
  const [change, setChange] = useState(true);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMoviesInList(user?.email).then((list) => {
        setList(list);
        setLoading(false);
      });
    }
  }, [user, change]);

  const gotoMoviePage = (id) => {
    setId(id);
    setComp("movie-page");
  };

  if (comp === "movie-page") {
    return (
      <MoviePage
        setComp={setComp}
        prev={"list"}
        id={id}
        change={change}
        setChange={setChange}
      />
    );
  }

  return (
    <>
      {!user ? (
        <GotoLogin />
      ) : (
        <>
          <span className="genre-page-title" style={{ flex: "1" }}>
            &nbsp;&nbsp; My List
          </span>
          {Loading ? (
            <div align="center">
              <div className="no-movie-found" align="center">
                Loading...
              </div>
            </div>
          ) : (
            ""
          )}
          {!list?.length && !Loading ? (
            <div align="center">
              <div className="no-movie-found" align="center">
                No movies in your list.
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="movies">
            {list?.map((movie, index) => (
              <div
                key={list[list.length - 1 - index]["id"]}
                className="movie-card"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${
                    list[list.length - 1 - index]["poster"]
                  })`,
                }}
                onClick={() => {
                  gotoMoviePage(list[list.length - 1 - index]["id"]);
                }}
              >
                {list[list.length - 1 - index]["poster"] === "" ? (
                  <div className="movie-name">
                    {list[list.length - 1 - index]["title"]}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default List;
