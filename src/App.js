import React from "react";
import { fetch_url } from "./utils";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import Discover from "./pages/Discover.js";
import Genres from "./pages/Genres";

const Wrapper = styled.div`
  display: flex;
`;

class App extends React.PureComponent {
  render() {
    console.log(1);
    return (
      <Wrapper>
        <Sidebar />
        <Switch>
          <Redirect from="/" to="/discover/popular" exact />
          <Route path="/discover/:name" component={Discover} />
          <Route path="/genre/:id" component={Genres} />
          <Route>Path not found</Route>
        </Switch>
      </Wrapper>
    );
  }
}

export default App;
