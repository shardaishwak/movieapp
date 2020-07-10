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

class Genre extends React.PureComponent {
  state = {
    films: [],
    loading: false,
  };
  componentDidMount() {
    const query = decrypt_query(this.props.location.search);
    const page = query.find((n) => n.page);
    this.setState({ loading: true });

    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=e366d974f73ae203397850eadc7bce1f&with_genres=${
        this.props.match.params.id
      }${page ? "&page=" + page.page : ""}`
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
  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      const query = decrypt_query(this.props.location.search);
      const page = query.find((n) => n.page);
      this.setState({ loading: true });

      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=e366d974f73ae203397850eadc7bce1f&with_genres=${
          this.props.match.params.id
        }${page ? "&page=" + page.page : ""}`
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
    const name = JSON.parse(localStorage.getItem("genres")).find(
      (p) => p.id === parseInt(this.props.match.params.id)
    );

    return (
      <div>
        <Title>{name.name}</Title>
        <SectionName>genres</SectionName>
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

export default withRouter(Genre);
