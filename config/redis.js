import Redis from 'ioredis';
import logger from '../config/winston.js';
import configuration from './index.js';
import _ from 'lodash';

class REDIS {
  constructor(configs) {
    try {
      if (!_.isEmpty(configs)) {
        this.configs = configs;
        this.client = new Redis(configs);
        logger.info(`connected`)
      } else {
        this.configs = configuration.redis
        this.client = new Redis(this.configs);
        logger.info(`connected`)
      }
    } catch (err) {
      logger.error("[redis.js][constructor] : add valid redis connection config  { host: 'x.x.x.x', port: xxxx, db: xx }")
    }
  }

  async hset(DB, hashName, value) {
    if (typeof value === 'object')
      value = JSON.stringify(value);
    return this.client.hset(DB, hashName, value);
  }
  
  async hdel (DB, hashname){
    return this.client.hdel(DB, hashname);
  }

  async hexists(DB, hashname){
    return this.client.hexists(DB, hashname);
  }

  async hget(DB, hashName){
    return this.client.hget(DB, hashName);
  }

  async hscan(DB, regex){
    return this.client.hscan(DB, 0,'MATCH',regex);
  }
}

export default REDIS;
