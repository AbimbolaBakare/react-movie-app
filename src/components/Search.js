import React, { useState } from "react";

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("Jumanji");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  return (
    <form className="search-form">
      <h2>Search Movies</h2>
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        className='form-input'
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" className='submit' />
    </form>
  );
};

export default Search;