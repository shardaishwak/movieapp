import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  padding: 30px 40px;

  input {
    padding: 10px 15px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #21212130;
    font-family: Poppins;
    border-radius: 5px;
    font-weight: 300;
    width: 100%;
  }
`;

const SearchInput = (props) => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => setSearch(e.target.value);
  const Search = (e) => {
    e.preventDefault();
    props.history.push(search ? "/search/" + search : "/");
  };
  return (
    <Form onSubmit={Search}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search movie"
        value={search}
      />
    </Form>
  );
};

export default withRouter(SearchInput);
