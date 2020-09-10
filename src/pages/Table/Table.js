import React, { useEffect, useContext } from 'react';
import { BooksContext } from '../../providers/BooksProvider';
import MaterialTable from 'material-table';
import icons from './tableIcons';
import api from '../../utils/api';
import { MediaQuery } from '../../utils/helpers';

const Table = ({ title, table, setTable, tableSetting, type }) => {
  const {
    setType,
    setBookDetail,
    editList,
    deleteList,
    setBookDetailVisibility,
  } = useContext(BooksContext);

  const isDesktopView = MediaQuery(514);

  useEffect(() => {
    setType(type);
  }, [type, setType]);

  const handleBookDetail = (url, id) => {
    api
      .getBookDetail(url)
      .then((res) => {
        const { volumeInfo, selfLink } = res.data;
        const { imageLinks } = volumeInfo;
        let thumbnail;
        if (imageLinks !== undefined) {
          thumbnail = imageLinks.thumbnail;
        } else {
          thumbnail = false;
        }
        setBookDetail({ ...volumeInfo, thumbnail, selfLink, id });
        setBookDetailVisibility(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <MaterialTable
        columns={tableSetting}
        data={table}
        title={title}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                editList(type, oldData, newData, setTable, table);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteList(type, oldData, setTable, table);
                resolve();
              }, 1000);
            }),
        }}
        icons={icons}
        options={{
          exportButton: true,
          actionsColumnIndex: -1,
          loadingType: 'linear',
          showTitle: isDesktopView,
          searchFieldAlignment: isDesktopView ? 'right' : 'left',
          // paging: false,
          pageSize: 10,
          pageSizeOptions: [10, 20, 30, 50, 75, 100],
        }}
        actions={[
          {
            icon: icons.ImportContactsIcon,
            tooltip: 'Book Detail',
            onClick: (event, rowData) => {
              handleBookDetail(rowData.selfLink, rowData.id || '');
            },
          },
        ]}
        localization={{
          body: {
            editRow: {
              deleteText: 'Are you sure you want to delete this book?',
            },
          },
        }}
      />
    </>
  );
};

export default Table;
