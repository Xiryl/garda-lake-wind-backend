const logger = require('../../utils/logger');

/**
 * [GET] /api/v1/status
 * @description reply with 200 if the server is up
 */
const route = async (fastify) => {
  const statusSchema = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
      },
    },
  };

  fastify.get('/status', statusSchema, async (request, reply) => {
    logger.debug(`[${process.pid}][${request.id}] Invoking server status`);
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ status: true, message: 'up' });
  });

  fastify.get('/limone', statusSchema, async (request, reply) => {
    logger.debug(`[${process.pid}][${request.id}] Invoking server status`);
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ status: true, message: 'up' });
  });
};

module.exports = route;
