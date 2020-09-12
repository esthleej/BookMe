import json2mq from 'json2mq';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const MediaQuery = (minWidth) => {
  const matches = useMediaQuery(
    json2mq({
      minWidth: minWidth,
    })
  );
  return matches;
};

export const toHttps = (url) => {
  return url.replace(/^http:\/\//i, 'https://');
};
