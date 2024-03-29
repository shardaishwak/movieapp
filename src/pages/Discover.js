import React from "react";
import { withRouter } from "react-router-dom";
import { decrypt_query } from "../utils";
import Films from "../components/Films";
import styled from "styled-components";

const Title = styled.div`
  font-size: 40px;
  text-transform: capitalize;
  font-weight: 200;
  color: #212121;
  margin-left: 40px;
`;
const SectionName = styled.div`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;

  margin-left: 40px;
`;

class Discover extends React.PureComponent {
  state = {
    films: [],
    laading: false,
    total_pages: 0,
    current_page: 0,
  };
  componentDidMount() {
    const query = decrypt_query(this.props.location.search);
    const page = query.find((n) => n.page);
    this.setState({ loading: true });

    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.match.params.name
      }?api_key=e366d974f73ae203397850eadc7bce1f${
        page ? "&page=" + page.page : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          films: data.results,
          loading: false,
          total_pages: data.total_pages,
          current_page: data.page,
        });
      })
      .catch((err) => console.log(err));
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      const query = decrypt_query(this.props.location.search);
      const page = query.find((n) => n.page);
      this.setState({ loading: true });

      fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.name
        }?api_key=e366d974f73ae203397850eadc7bce1f${
          page ? "&page=" + page.page : ""
        }`
      )
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            films: data.results,
            loading: false,
            total_pages: data.total_pages,
            current_page: data.page,
          })
        )
        .catch((err) => console.log(err));
    }
  }
  render() {
    let title;

    if (this.props.match.params.name === "popular") title = "popular";
    else if (this.props.match.params.name === "top_rated") title = "top rated";
    else title = "upcoming";
    return (
      <div>
        <Title>{title}</Title>
        <SectionName>movie</SectionName>
        <Films
          films={this.state.films}
          total_pages={this.state.total_pages}
          loading={this.state.loading}
          current_page={this.state.current_page}
        />
      </div>
    );
  }
}

export default withRouter(Discover);
