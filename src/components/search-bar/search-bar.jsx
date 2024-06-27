<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import './search-bar.scss';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Search for a movie  . . ."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-3 custom-search-bar"
    />
=======
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
>>>>>>> 63aa432aad2462945690d15827087961a42d744f
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
