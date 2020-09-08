import React, { useContext } from 'react';
import { BooksContext } from '../../providers/BooksProvider';
import { BookDetailContent } from './BookDetailContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const BookDetail = () => {
  const {
    type,
    isBookDetail,
    setBookDetailVisibility,
    bookDetail,
    addReadingLog,
    addWishList,
    moveWishToRead,
  } = useContext(BooksContext);

  const {
    title,
    authors = ['N/A'],
    description,
    pageCount,
    averageRating,
    ratingsCount,
    publishedDate,
    thumbnail,
    previewLink,
  } = bookDetail || {};

  const Actions = (type) => {
    switch (type) {
      case 'search':
        return (
          <DialogActions>
            <Button autoFocus onClick={addReadingLog} color="primary">
              Add to Reading Log
            </Button>
            <Button autoFocus onClick={addWishList} color="primary">
              Add to Wish List
            </Button>
          </DialogActions>
        );
      case 'wishList':
        return (
          <DialogActions>
            <Button autoFocus onClick={moveWishToRead} color="primary">
              Move to Reading Log
            </Button>
          </DialogActions>
        );
      default:
        return;
    }
  };

  return (
    <div>
      <Dialog
        onClose={() => setBookDetailVisibility(false)}
        aria-labelledby="customized-dialog-title"
        open={isBookDetail}
      >
        <BookDetailContent
          dividers
          title={title}
          thumbnail={thumbnail}
          authors={authors}
          pageCount={pageCount}
          averageRating={averageRating}
          description={description}
          ratingsCount={ratingsCount}
          publishedDate={publishedDate}
          previewLink={previewLink}
        />
        {Actions(type)}
      </Dialog>
    </div>
  );
};

export default BookDetail;
