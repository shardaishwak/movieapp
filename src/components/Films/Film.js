import React from "react";
import styled from "styled-components";
import ReactStars from "react-stars";

const Container = styled.div`
  border-radius: 10px;
  transition: 0.15s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  .title {
    font-size: 13px;
    text-align: center;
    margin: 10px 0;
    padding: 0 10px;
  }
  &:hover {
    background: #212121;
    color: #fff;

    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  }
`;

const Film = (props) => (
  <Container>
    <img
      src={`https://image.tmdb.org/t/p/w342` + props.film.poster_path}
      alt={props.film.title + " poster"}
    />
    <div className="title">{props.film.title}</div>
    <ReactStars
      count={5}
      value={props.film.vote_average / 2}
      color2={"#fada5e"}
    />
  </Container>
);

export default Film;
