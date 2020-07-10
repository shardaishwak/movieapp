import React from "react";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Discover from "./pages/Discover.js";
import Genres from "./pages/Genres";
import Search from "./pages/Search";
import SearchInput from "./components/SearchInput";

import pnf from "./assets/404.png";

const Wrapper = styled.div`
  display: flex;
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
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

class App extends React.PureComponent {
  // move serach ingine to own compo

  render() {
    return (
      <Wrapper>
        <Sidebar />
        <Container>
          <SearchInput />
          <Switch>
            <Redirect from="/" to="/discover/popular" exact />
            <Route path="/discover/:name" component={Discover} />
            <Route path="/genre/:id" component={Genres} />
            <Route path="/search/:query" component={Search} />
            <Route>
              <NotFound>
                <img src={pnf} alt="404."></img>
              </NotFound>
            </Route>
          </Switch>
        </Container>
      </Wrapper>
    );
  }
}

export default withRouter(App);
