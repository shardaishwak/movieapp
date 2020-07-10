import React from "react";
import { withRouter } from "react-router-dom";
import { fetch_url } from "../utils";

class Discover extends React.PureComponent {
  state = {
    films: [],
    laading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.name +
        "?api_key=e366d974f73ae203397850eadc7bce1f"
    )
      .then((res) => res.json())
      .then((data) => this.setState({ films: data.results, loading: false }))
      .catch((err) => console.log(err));
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.setState({ loading: true });
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.props.match.params.name +
          "?api_key=e366d974f73ae203397850eadc7bce1f"
      )
        .then((res) => res.json())
        .then((data) => this.setState({ films: data.results, loading: false }))
        .catch((err) => console.log(err));
    }
  }
  render() {
    console.log(this.state.films);
    console.log(this.props.match.params);
    return (
      <div>
        {this.state.loading ? (
          <h4>Loading...</h4>
        ) : (
          <div>
            {this.state.films.map((film) => (
              <h3>{film.original_title}</h3>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Discover);
