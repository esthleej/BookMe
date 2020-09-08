import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Books from '../../component/Books/Books';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../utils/api';
import { BooksContext } from '../../providers/BooksProvider';

const Search = () => {
  const classes = useStyles();
  const location = useLocation();
  const [term, setTerm] = useState('');
  const [books, setBooks] = useState([]);
  const { setType } = useContext(BooksContext);

  useEffect(() => {
    setType('search');
  }, [location, setType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (term === '') {
      setBooks([]);
    } else {
      handleFindAllBooks(term);
    }
  };

  const handleFindAllBooks = () => {
    api
      .getAllBooks(term)
      .then((res) => {
        setBooks(res.data.items);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <h1 className={classes.h1}>Book Finder</h1>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              aria-describedby="search-field"
              id="search-book-field"
              onChange={(event) => setTerm(event.target.value)}
              value={term}
              placeholder="Search book"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Search
            </Button>
          </form>
          <Books books={books} />
        </div>
      </div>
    </>
  );
};

export default Search;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  formContainer: {
    width: 500,
    minWidth: 300,
    padding: '20px',
    marginTop: '60px',
  },

  form: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textField: {
    width: '100%',
    padding: '0 7px 0 0',
    alignItems: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  h1: {
    textAlign: 'center',
    fontWeight: 300,
  },
}));
