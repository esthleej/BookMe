export const ToHttps = (url) => {
  return url.replace(/^http:\/\//i, 'https://');
};
