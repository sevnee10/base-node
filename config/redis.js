const Redis = require('ioredis')

global.REDIS = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || '6379'
}

global.redisClient = new Redis({
  port: global.REDIS.port,
  host: global.REDIS.host
})
