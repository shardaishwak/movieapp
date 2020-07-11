import React from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import nf from "../assets/not_found.png";
import ReactStars from "react-stars";
import Films from "../components/Films";
import { decrypt_query } from "../utils";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 50px;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
    margin: 30px 20px;
  }
`;

const ImageContainer = styled.div`
  margin-right: 40px;

  img {
    border-radius: 7.5px;
    box-shadow: rgba(0, 0, 0, 0.2);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 1100px) {
    margin-bottom: 30px;
    margin-right: 0;
  }
`;
const Desc = styled.div``;
const Titles = styled.div`
  color: #212121;
  text-transform: uppercase;
  margin-bottom: 30px;

  @media screen and (max-width: 1100px) {
    text-align: center;
  }
  .title {
    font-size: 40px;
    font-weight: 200;
    line-height: 1.2;
  }
  .subtitle {
    font-weight: 400;
    font-size: 18px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

const Languages = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #21212170;
  text-transform: uppercase;
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
const NotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;

  img {
    width: 50%;
  }
`;
const SectionName = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 30px;
`;
const Genres = styled.div`
  font-size: 13px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;
const GenreLink = styled(Link)`
  color: #21212190;
  margin-left: 10px;
  margin-top: 5px;
  font-weight: 600;

  &:hover {
    color: #212121;
  }

  i {
    color: #212121;
    margin-right: 5px;
  }
`;
const Synopsis = styled.div`
  font-size: 14px;
  line-height: 1.7;
  font-weight: 300;
  margin-top: 10px;
`;
const Button = styled.a`
  padding: 7px 15px;
  border-radius: 999px;
  border: 1px solid #212121;
  font-size: 13px;
  display: inline-block;
  margin-right: 15px;
  color: #212121;

  &:hover {
    background: #212121;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #fff;
  }

  i {
    margin-right: 5px;
  }
`;

const Back = styled.div`
  padding: 7px 15px;
  border-radius: 999px;
  border: 1px solid #212121;
  font-size: 13px;
  display: inline-block;

  background: #212121;
  margin-right: 15px;
  color: #fff;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  i {
    margin-right: 5px;
  }
`;

class MainFilm extends React.PureComponent {
  state = {
    loading: false,
    film: {},
    films: [],
    films_loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true, films_loading: false });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.id +
        "?api_key=e366d974f73ae203397850eadc7bce1f&append_to_response=videos"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ film: data, loading: false });

        return fetch(
          "https://api.themoviedb.org/3/movie/" +
            this.props.match.params.id +
            "/recommendations" +
            "?api_key=e366d974f73ae203397850eadc7bce1f&append_to_response=videos"
        );
      })
      .then((res) => res.json())
      .then((data) => this.setState({ films: data, films_loading: false }))
      .catch((err) => console.log(err));
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const query = decrypt_query(this.props.location.search);
      const page = query.find((n) => n.page);
      this.setState({ films_loading: true });
      console.log("here");

      fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id + "/recommendations"
        }?api_key=e366d974f73ae203397850eadc7bce1f${
          page ? "&page=" + page.page : ""
        }`
      )
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            films: data,
            films_loading: false,
          })
        )
        .catch((err) => console.log(err));
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({ loading: true, films_loading: false });

      fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.props.match.params.id +
          "?api_key=e366d974f73ae203397850eadc7bce1f&append_to_response=videos"
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({ film: data, loading: false });

          return fetch(
            "https://api.themoviedb.org/3/movie/" +
              this.props.match.params.id +
              "/recommendations" +
              "?api_key=e366d974f73ae203397850eadc7bce1f&append_to_response=videos"
          );
        })
        .then((res) => res.json())
        .then((data) => this.setState({ films: data, films_loading: false }))
        .catch((err) => console.log(err));
    }
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <div>
            {this.state.film ? (
              <Container>
                <ImageContainer>
                  <img
                    src={
                      `https://image.tmdb.org/t/p/w342` +
                      this.state.film.poster_path
                    }
                    alt={this.state.film.poster_path}
                  ></img>
                </ImageContainer>
                <Desc>
                  <Titles>
                    <div className="title">{this.state.film.title}</div>
                    <div className="subtitle">{this.state.film.tagline}</div>
                  </Titles>
                  <Flex>
                    <ReactStars
                      count={5}
                      size={20}
                      value={this.state.film.vote_average / 2}
                      color2={"#212121"}
                      edit={false}
                    />
                    <Languages>{this.state.film.runtime} min.</Languages>
                  </Flex>
                  <div>
                    <SectionName>GENRES</SectionName>
                    <Genres>
                      {this.state.film.genres &&
                        this.state.film.genres.map((genre) => {
                          return (
                            <GenreLink key={genre.id} to={"/genre/" + genre.id}>
                              <i className="fad fa-play-circle"></i>
                              {genre.name}
                            </GenreLink>
                          );
                        })}
                    </Genres>
                  </div>
                  <div>
                    <SectionName>SYNOPSIS</SectionName>
                    <Synopsis>{this.state.film.overview}</Synopsis>
                  </div>
                  <Flex>
                    <div>
                      <Button href={this.state.film.homepage} target="_blank">
                        <i className="far fa-link"></i> Website
                      </Button>
                      <Button
                        href={"www.imdb.com/title/" + this.state.film.imdb_i}
                      >
                        <i className="fab fa-imdb"></i> IMDB
                      </Button>
                      {this.state.film.videos && (
                        <Button
                          target="_blank"
                          href={
                            "https://www.youtube.com/watch?v=" +
                              this.state.film.videos.resuls >
                            0
                              ? this.state.film.videos.results[0].key
                              : ""
                          }
                        >
                          <i className="far fa-play"></i> Trailer
                        </Button>
                      )}
                    </div>
                    <Back onClick={() => this.props.history.goBack()}>
                      <i className="far fa-long-arrow-left"></i> Back
                    </Back>
                  </Flex>
                </Desc>
              </Container>
            ) : (
              <NotFound src={nf} alt={"Not found"}></NotFound>
            )}
            <Films
              films={this.state.films.results}
              loading={this.state.films_loading}
              total_pages={this.state.films.total_pages}
              current_page={this.state.films.page}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(MainFilm);
