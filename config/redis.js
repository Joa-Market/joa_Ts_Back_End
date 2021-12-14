// const redis = require('redis');
const redis = require('ioredis');



// const redisClient = redis.createClient({
//     url: `redis://${process.env.REDIS_URL}:${process.env.REDIS_PROT}`,
//     password: "G6OUFWm8kOnCdOqxT7syzAulbpZdDT3A"
// });
const redisClient = redis.createClient({
    host : "127.0.0.1", port : 6379, db : 0, password:process.env.REDIS_LOCALPASSWORD
});
// // const redisClient = redis.createClient(6379, '192.168.219.104');

// redisClient.connect();
// redisClient.auth(process.env.REDIS_PASSWORD,function (err) {

//     if (err) console.log(err)
//     //throw err;

// });

redisClient.on('error', function(err) {

    console.log('Redis error: ' + err);

});
redisClient.hset('users', 15544, 55555);
redisClient.hget('users', 15544, function (err , data) {
    console.log(data);
})

module.exports = redisClient;