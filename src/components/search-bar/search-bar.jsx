// src/components/search-bar/search-bar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl } from 'react-bootstrap';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Form className="mb-4">
      <FormControl
        type="search"
        placeholder="Search for movies"
        className="mr-sm-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Form>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
