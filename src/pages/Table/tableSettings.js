export const readingLogTable = [
  { title: 'Title', field: 'title', editable: 'never' },
  { title: 'Author(s)', field: 'authors', editable: 'never' },
  { title: 'Genre', field: 'genre', editable: 'onUpdate' },
  {
    title: 'Start Date',
    field: 'startDate',
    type: 'date',
    editable: 'onUpdate',
  },
  { title: 'End Date', field: 'endDate', type: 'date', editable: 'onUpdate' },
];

export const wishListTable = [
  {
    title: 'Picked by',
    field: 'name',
    editable: 'onUpdate',
  },
  { title: 'Title', field: 'title', editable: 'never' },
  { title: 'Author(s)', field: 'authors', editable: 'never' },
  { title: 'Genre', field: 'genre', editable: 'onUpdate' },
];
