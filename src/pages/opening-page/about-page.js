import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function About({ showAbout, setShowAbout }) {
  const handleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <div className="background">
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2" id="about" align="center">
            <div className="row">
              <div className="col-8 offset-2 about-title">
                <span>Movie Recommender</span>
              </div>
              <div className="col-1 offset-1 close" onClick={handleAbout}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </div>
            </div>
            <div id="about-text">
              <p>
                Welcome to our Movie Recommender! We're thrilled to have you
                here. Our mission is to provide you with personalized movie
                recommendations, helping you discover films that suit your taste
                and preferences. Sit back, relax, and let us guide you through
                the wonderful world of cinema.
              </p>
              <p>
                Our Movie Recommender is built using modern web technologies to
                provide a seamless and interactive user experience. Here are
                some key components and resources we utilize in creating and
                running our platform
              </p>
              <ul>
                <li>
                  We employ popular front-end framework React.js and other
                  necassary libraries to build a dynamic UI.
                </li>
                <li>
                  We utilize database management system Firebase to store and
                  retrieve movie data, user information, and other relevant
                  data.
                </li>
                <li>
                  We integrated external APIs like TMDb and others which provide
                  us with comprehensive movie details, ratings, reviews, and
                  other relevant metadata.
                </li>
              </ul>
              <p>
                We strive to create a user-centric platform that caters to your
                movie preferences and provides an enjoyable experience. Your
                feedback allows us to continuously refine and enhance our
                services to better serve you and the entire movie-loving
                community.
              </p>
              <p>
                In case of any queries or feedback, you can reach out to us by
                writing to <b>walker.1100100@gmail.com.</b>
              </p>
              <br></br>
              <p>
                <b>
                  <i>Happy exploring :)</i>
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
