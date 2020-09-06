import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

const parse = require('html-react-parser');

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    minWidth: '500px',
    maxWidth: '500px',
  },

  cardInfo: {
    display: 'flex',
  },

  cardDescription: {
    paddingTop: 10,
  },

  cardInfoLeft: {
    paddingRight: 30,
  },

  cardInfoRight: {},

  cardRating: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '2px 0px',
  },
  cardRatingText: {
    paddingLeft: 8,
  },
});

export const BookDetailContent = withStyles(styles)((props) => {
  const {
    title,
    thumbnail,
    authors,
    pageCount,
    averageRating,
    ratingsCount,
    description,
    publishedDate,
    classes,
    onClose,
    ...other
  } = props;

  return (
    <MuiDialogContent className={classes.root} {...other}>
      <div className={classes.cardInfo}>
        {thumbnail && (
          <div className={classes.cardInfoLeft}>
            <img src={thumbnail} alt="book cover" />
          </div>
        )}

        <div className={classes.cardInfoRight}>
          <Typography variant="h5"> {title}</Typography>

          {authors[0] !== 'N/A' && <Typography>by {authors}</Typography>}

          {ratingsCount !== undefined && (
            <div className={classes.cardRating}>
              <Rating
                name="read-only"
                value={averageRating}
                precision={0.5}
                readOnly
              />
              <Typography
                color="textSecondary"
                variant="caption"
                className={classes.cardRatingText}
              >
                {averageRating} • {ratingsCount} ratingse
              </Typography>
            </div>
          )}

          {pageCount !== undefined && (
            <Typography variant="body2" color="textSecondary">
              Published {publishedDate} • {pageCount} pages
            </Typography>
          )}
        </div>
      </div>

      {description !== undefined && (
        <div className={classes.cardDescription}>
          <Typography>{parse(description)}</Typography>
        </div>
      )}
    </MuiDialogContent>
  );
});
