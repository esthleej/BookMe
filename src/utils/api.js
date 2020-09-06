import axios from 'axios';

export default {
  getAllBooks: function (query) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  },
  getBookDetail: function (url) {
    return axios.get(url);
  },
};
