import redis from 'redis';

(async () => {
  const subscriber = redis.createClient({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS,
  });

  subscriber.on('message', (channel, message) => {
    console.log({ channel, message });
  });

  subscriber.subscribe('sendmail');
})()
  .then(() => console.log('Running'))
  .catch((err) => {
    console.log(err);
  });
