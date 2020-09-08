import React, { useContext, Fragment } from 'react';
import { BooksContext } from '../../providers/BooksProvider';
import { makeStyles } from '@material-ui/core/styles';
import { ToHttps } from '../../utils/helpers';

const Books = ({ books }) => {
  const classes = useStyles();
  const { setBookDetail, setBookDetailVisibility } = useContext(BooksContext);

  const bookInfo = books.map(({ volumeInfo, id, selfLink }) => {
    const { title, imageLinks } = volumeInfo;
    let thumbnail;
    if (imageLinks !== undefined) {
      thumbnail = imageLinks.thumbnail;
    } else {
      thumbnail = false;
    }

    const handleBookDetail = () => {
      setBookDetail({ selfLink, ...volumeInfo, thumbnail });
      setBookDetailVisibility(true);
    };

    return (
      <Fragment key={id}>
        <div className={classes.book} onClick={handleBookDetail}>
          <div className={classes.bookCover}>
            {thumbnail && (
              <img src={ToHttps(thumbnail)} alt="book cover" height="40" />
            )}
          </div>
          <div className={classes.bookTitle}>{title}</div>
        </div>
      </Fragment>
    );
  });

  return <div className={classes.root}>{bookInfo}</div>;
};

export default Books;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  bookContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  book: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    cursor: 'pointer',
    '&:hover': {
      background: '#f0f0f0',
    },
  },
  bookCover: {
    paddingRight: 12,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
