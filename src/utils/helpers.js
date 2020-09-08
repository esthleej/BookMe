import json2mq from 'json2mq';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const MediaQuery = () => {
  const matches = useMediaQuery(
    json2mq({
      minWidth: 514,
    })
  );
  return matches;
};

export const ToHttps = (url) => {
  return url.replace(/^http:\/\//i, 'https://');
};
