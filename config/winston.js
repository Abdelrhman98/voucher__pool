import _ from 'lodash';

import winston from 'winston';
import expressWinston from 'express-winston';
import configuration from './index.js';

let level;
let silent;

switch (configuration.environment) {
  case 'production':
  case 'staging':
    level = 'info';
    silent = false;
    break;
  case 'development':
    level = 'debug';
    silent = false;
    break;
  default:
    level = 'emerg';
    silent = false;
    break;
}

const JSONFormatter = (log) => {
  const message = Symbol.for('message');
  const base = { timestamp: new Date(), severity: log.level.toUpperCase() };
  const json = Object.assign(base, log);
  log[message] = JSON.stringify(json);
  return log;
};

const logger = winston.createLogger({
  level,
  silent,
  defaultMeta: {
    service: 'rakha-app',
    version: '1.0.0',
  },
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      json: true,
      colorize: true,
      format: winston.format(JSONFormatter)(),
    })
  ],
  exitOnError: false,
});

const expressWinstonMiddleware = expressWinston.logger({
  winstonInstance: logger,
  metaField: null,
  requestWhitelist: ['headers', 'query', 'body'],
  responseWhitelist: ['body'],
  expressFormat: true,
  colorize: false,
  statusLevels: false,
  requestFilter(req, propName) {
    if (propName == 'body') {
      if (_.has(req.body, 'password')) delete req.body.password;
      if (_.has(req.body, 'businessAdminData.password')) delete req.body.businessAdminData.password;
    }
    return req[propName];
  },
  responseFilter(res, propName) {
    if (propName == 'body') {
      delete res.body;
    }
    return res[propName];
  },
  ignoreRoute: (req, res) => {
    if (req.path == '/v2/admins') return true;
    if (req.path == '/') return true;
    if (req.headers.host == configuration.winston.host) return true;
    if (req.method == 'OPTIONS') return true;
    return false;
  },
  level: (req, res) => {
    let logLevel = '';
    if (res.statusCode >= 100) {
      logLevel = 'info';
    }
    if (res.statusCode >= 400) {
      logLevel = 'warn';
    }
    if (res.statusCode >= 500) {
      logLevel = 'error';
    }
    if (res.statusCode == 401 || res.statusCode == 403) {
      logLevel = 'warn';
    }
    return logLevel;
  },
  dynamicMeta: (req, res) => {
    const httpRequest = {};
    const meta = {};
    if (req) {
      meta.httpRequest = httpRequest;
      httpRequest.requestMethod = req.method;
      httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      httpRequest.protocol = `HTTP/${req.httpVersion}`;
      httpRequest.remoteIp = req.clientIp; // this includes both ipv6 and ipv4 addresses separated by ':'
      httpRequest.remoteIp = req.clientIp.indexOf(':') >= 0
        ? req.clientIp.substring(req.clientIp.lastIndexOf(':') + 1)
        : req.clientIp; // just ipv4
      httpRequest.requestSize = req.socket.bytesRead;
      httpRequest.userAgent = req.get('User-Agent');
      meta.user = req.user;
    }

    if (res) {
      meta.httpRequest = httpRequest;
      httpRequest.status = res.statusCode;
      httpRequest.latency = {
        seconds: Math.floor(res.responseTime / 1000),
        nanos: (res.responseTime % 1000) * 1000000,
      };
      if (res.body) {
        if (typeof res.body === 'object') {
          httpRequest.responseSize = JSON.stringify(res.body).length;
        } else if (typeof res.body === 'string') {
          httpRequest.responseSize = res.body.length;
        }
      }
    }
    return meta;
  },
});

const expressWinstonErrorMiddleware = expressWinston.errorLogger({
  winstonInstance: logger,
  metaField: null,
  colorize: false,
  requestWhitelist: ['headers', 'query', 'body'],
  msg: '{{req.method}} {{req.path}} {{err.message}}',
  responseWhitelist: ['body'],
  requestFilter(req, propName) {
    if (propName == 'body') {
      if (_.has(req.body, 'password')) delete req.body.password;
      if (_.has(req.body, 'businessAdminData.password')) delete req.body.businessAdminData.password;
    }
    return req[propName];
  },
  dynamicMeta: (req, res, err) => {
    const httpRequest = {};
    const meta = {};
    if (req) {
      meta.httpRequest = httpRequest;
      httpRequest.requestMethod = req.method;
      httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      httpRequest.protocol = `HTTP/${req.httpVersion}`;
      httpRequest.remoteIp = req.clientIp; // this includes both ipv6 and ipv4 addresses separated by ':'
      httpRequest.remoteIp = req.clientIp.indexOf(':') >= 0
        ? req.clientIp.substring(req.clientIp.lastIndexOf(':') + 1)
        : req.clientIp; // just ipv4
      httpRequest.requestSize = req.socket.bytesRead;
      httpRequest.userAgent = req.get('User-Agent');
      httpRequest.referrer = req.get('Referrer');
      meta.user = req.user;
    }

    if (res) {
      meta.httpRequest = httpRequest;
      httpRequest.status = res.statusCode;
      httpRequest.latency = {
        seconds: Math.floor(res.responseTime / 1000),
        nanos: (res.responseTime % 1000) * 1000000,
      };
      if (res.body) {
        if (typeof res.body === 'object') {
          httpRequest.responseSize = JSON.stringify(res.body).length;
        } else if (typeof res.body === 'string') {
          httpRequest.responseSize = res.body.length;
        }
      }
    }

    if (err) {
      httpRequest.status = err.status;
    }
    return meta;
  },
});

const createLogger = () => ({
  getLogger() {
    return logger;
  },
  getExpressWinstonMiddleware() {
    return expressWinstonMiddleware;
  },
  getExpressWinstonErrorMiddleware() {
    return expressWinstonErrorMiddleware;
  },
  info(message) {
    return logger.info(message);
  },
  error(message) {
    return logger.error(message);
  },
  debug(message) {
    return logger.debug(message);
  },
  warn(message) {
    return logger.warn(message);
  },
  log(message) {
    return logger.log(message);
  },
});

export default createLogger();
