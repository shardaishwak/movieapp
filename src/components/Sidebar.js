import React from "react";
import { fetch_url } from "../utils";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  width: 25%;
  height: 100vh;
  overflow: auto;
  background: #fff;
  color: #212121;
  margin-right: 20px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  padding: 20px;
`;

const Section = styled.div`
  margin: 30px 20px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
`;
const SectionName = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

const SectionLink = styled(NavLink)`
  font-size: 14px;
  color: #21212190;
  padding: 7.5px 15px;
  border-radius: 999px;
  border: 1px solid transparent;
  margin-top: 10px;
  text-transform: capitalize;

  &.active {
    color: #212121;
    border-color: #212121;
    font-weight: 600;
  }
`;

class Sidebar extends React.Component {
  state = {
    links: [],
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    fetch_url(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=e366d974f73ae203397850eadc7bce1f",
      (data) => this.setState({ links: data.genres, loading: false })
    );
  }
  render() {
    console.log(this.state.links);
    return (
      <Container>
        <Title>Movie App</Title>
        <Section>
          <SectionName>discover</SectionName>
          <SectionLink activeClassName="active" to="/discover/popular">
            popular
          </SectionLink>
          <SectionLink activeClassName="active" to="/discover/top_rated">
            top rated
          </SectionLink>
          <SectionLink activeClassName="active" to="/discover/upcoming">
            upcoming
          </SectionLink>
        </Section>
        {this.state.loading ? (
          <h4>Loading...</h4>
        ) : (
          <Section>
            <SectionName>Genres</SectionName>
            {this.state.links.map((link) => (
              <SectionLink
                key={link.id}
                activeClassName="active"
                to={"/genre/" + link.id}
              >
                {link.name}
              </SectionLink>
            ))}
          </Section>
        )}
      </Container>
    );
  }
}
export default Sidebar;
