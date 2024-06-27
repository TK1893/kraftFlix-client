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
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
