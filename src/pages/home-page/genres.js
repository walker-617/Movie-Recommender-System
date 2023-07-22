import React from "react";

function Genres({ setComp, setGenre }) {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science_Fiction",
    "Thriller",
    "TV_Movie",
    "War",
    "Western",
  ];

  const gotoGenrePage = (genre) => {
    setComp("genrePage");
    setGenre(genre);
  };

  return (
    <div className="genres" align="center">
      {genres.map((genre, index) => (
        <div
          onClick={() => {
            gotoGenrePage(genre);
          }}
          key={genre}
          className="genre"
          style={{
            backgroundImage: `linear-gradient(310deg, rgb(192, 192, 192,0), rgba(0,0,0,1)),url(${require(`../../assets/genreBackdrops/${genre}.jpg`)})`,
          }}
        >
          <span className="genre-title">{genre.replace("_", " ")}</span>
        </div>
      ))}
    </div>
  );
}

export default Genres;
