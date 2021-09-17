import pino from 'pino';

export default pino({
  name: 'remail',
  level: 'info',
  prettyPrint: {
    ignore: 'pid',
    translateTime: 'yyyy-mm-dd:HH:MM:ss:l Z',
  },
});
