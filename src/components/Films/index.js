import React from "react";
import Film from "./Film";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import nf from "../../assets/not_found.png";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  padding: 20px 40px;
  grid-gap-rows: 40px;
  margin-top: 20px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #212121;
  animation: float 0.75s linear infinite;

  margin-top: 50px;

  font-weight: 300;
  font-size: 30px;
  height: 100%;

  @keyframes float {
    from {
      opacity: 0.2;
    }
    to {
      opacity: 0.8;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 40px;
  margin-top: 20px;

  p {
    color: #21212180;
    font-size: 12px;
  }

  button {
    background: #212121;
    color: #fff;
    font-size: 13px;
    padding: 8px 20px;
    border-radius: 4px;
    border: none;
    outline: none;
    font-family: Poppins;
    font-weight: 300;

    i {
      font-size: 15px;
    }
    i.right {
      margin-left: 10px;
    }
    i.left {
      margin-right: 10px;
    }

    &:hover {
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;

const NotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;

  img {
    width: 50%;
  }
`;

const Films = (props) => {
  const PageDown = () => {
    props.history.push(
      props.location.pathname + "?page=" + (parseInt(props.current_page) - 1)
    );
  };
  const PageUp = () => {
    props.history.push(
      props.location.pathname + "?page=" + (parseInt(props.current_page) + 1)
    );
  };
  return (
    <>
      {props.loading ? (
        <Loading>Loading</Loading>
      ) : (
        <div>
          {props.films && props.films.length > 0 ? (
            <Container>
              {props.films.map((film) => (
                <Film key={film.id} film={film} link={"/movie/" + film.id} />
              ))}
            </Container>
          ) : (
            <NotFound>
              <img src={nf} alt="not found" />
            </NotFound>
          )}
        </div>
      )}
      <Buttons>
        {props.current_page > 1 ? (
          <button onClick={PageDown}>
            <i className="fal left fa-long-arrow-left"></i> Page{" "}
            {props.current_page - 1}
          </button>
        ) : (
          <div></div>
        )}
        <p>
          {props.current_page} - {props.total_pages} pages
        </p>
        {props.current_page < props.total_pages ? (
          <button onClick={PageUp}>
            Page {props.current_page + 1}{" "}
            <i className="fal right fa-long-arrow-right"></i>
          </button>
        ) : (
          <div></div>
        )}
      </Buttons>
    </>
  );
};

export default withRouter(Films);
