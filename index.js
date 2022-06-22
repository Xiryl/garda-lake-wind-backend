const envs = require('dotenv').config({ path: 'src/config/.env' });
const cluster = require('cluster');
const logger = require('./src/utils/logger');
const pjson = require('./package.json');

if (envs.error) {
  throw envs.error;
}

const clusterWorkerSize = process.env.PROCESS_WORKERS_QTA;

logger.info(`[${process.pid}] Starting server #wrk:${clusterWorkerSize} ...`);
const server = require('./src/server');

const start = async () => {
  try {
    // =============================================================================
    // SERVER RUN
    // =============================================================================
    server.listen(process.env.API_PORT, process.env.API_HOST, (err, address) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }

      logger.info('=========== API STATUS ===========');
      logger.info(`VERSION: ${pjson.version}`);
      logger.info('MAJOR API: v2');
      logger.info(`HTTP2 ENABLED: ${server.http2}`);
      logger.info(`Listening on ${address}`);
      logger.info(`Worker pid: ${process.pid}`);
      logger.info('==================================');
    });

    server.ready((err) => {
      if (err) {
        logger.error(`An error occurred during start fastify: ${err}`);
      }
      logger.debug(`\n--- Server routes ----\n${server.printRoutes()}\n--- Server routes ----\n`);
    });
  } catch (err) {
    process.exit(1);
  }
};

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i += 1) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      logger.error('Worker', worker.id, ' has exited!');
    });
  } else {
    start();
  }
} else {
  start();
}
