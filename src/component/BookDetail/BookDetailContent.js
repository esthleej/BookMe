import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { toHttps, MediaQuery } from '../../utils/helpers';

const parse = require('html-react-parser');

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    maxWidth: '500px',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 16px 16px 16px !important',
    },
  },

  closeBtnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  closeBtn: {
    padding: 0,
  },

  cardInfo: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },

  cardDescription: {
    paddingTop: 10,
  },

  cardInfoLeft: {
    paddingRight: 30,
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      paddingRight: 0,
    },
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
    handleClose,
    title,
    thumbnail,
    authors,
    pageCount,
    averageRating,
    ratingsCount,
    description,
    publishedDate,
    previewLink,
    classes,
    onClose,
    ...other
  } = props;

  const showCloseBtn = !MediaQuery(599);

  return (
    <MuiDialogContent className={classes.root} {...other}>
      {showCloseBtn && (
        <div className={classes.closeBtnContainer}>
          <IconButton
            aria-label="close"
            className={classes.closeBtn}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}

      <div className={classes.cardInfo}>
        {thumbnail && (
          <div className={classes.cardInfoLeft}>
            <img src={toHttps(thumbnail)} alt={`${title} book cover`} />
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
                {averageRating} • {ratingsCount} ratings
              </Typography>
            </div>
          )}

          {pageCount !== undefined && (
            <Typography variant="body2" color="textSecondary">
              Published {publishedDate} • {pageCount} pages
            </Typography>
          )}

          {previewLink !== undefined && (
            <Typography variant="body2" color="textSecondary">
              <Link href={toHttps(previewLink)}>Preview this book</Link>
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
