import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MaterialTable from 'material-table';
import icons from './tableIcons';

import api from '../../utils/api';

import { BooksContext } from '../../providers/BooksProvider';

const Table = ({ title, table, setTable, tableSetting, type }) => {
  const location = useLocation();
  const { setType, setBookDetail, editList, deleteList } = useContext(
    BooksContext
  );

  useEffect(() => {
    setType(location.pathname);
  }, [location, setType]);

  const handleBookDetail = (url) => {
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
        setBookDetail({ ...volumeInfo, thumbnail, selfLink });
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
          // showTitle: false,
        }}
        actions={[
          {
            icon: icons.ImportContactsIcon,
            tooltip: 'Book Detail',
            onClick: (event, rowData) => {
              handleBookDetail(rowData.selfLink);
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
