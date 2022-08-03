const logger = require('../../utils/logger');

const dataNavene = require('../../lib/naveneParser');
const dataLimone = require('../../lib/limoneParser');
const dataCvt = require('../../lib/cvtParser');
const dataRdg = require('../../lib/rdgParser');
const dataCampione = require('../../lib/campioneParser');
const dataTorri = require('../../lib/torriParser');

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

  fastify.get('/all', async (request, reply) => {
    logger.debug(`[${process.pid}][${request.id}] Invoking all`);

    try {
      const all = [];
      let jsonData = await dataRdg.elaborate();
      jsonData.location = 'VARONE';
      all.push(jsonData);
      jsonData = await dataCvt.elaborate();
      jsonData.location = 'C.V.T.';
      all.push(jsonData);
      jsonData = await dataNavene.elaborate();
      jsonData.location = 'NAVENE';
      console.log('navene');
      all.push(jsonData);
      jsonData = await dataLimone.elaborate();
      jsonData.jsonData.location = 'LIMONE';
      console.log('limone');
      all.push(jsonData.jsonData);
      jsonData = await dataCampione.elaborate();
      console.log('campione');
      jsonData.jsonData.location = 'CAMPIONE';
      all.push(jsonData.jsonData);
      jsonData = await dataTorri.elaborate();
      console.log('torri');
      jsonData.location = 'TORRI';
      all.push(jsonData);
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: true, data: all });
    } catch (ex) {
      console.log(ex);
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: false });
    }
  });

  fastify.get('/limone', async (request, reply) => {
    logger.debug(`[${process.pid}][${request.id}] Invoking limone`);

    try {
      const dat = await dataLimone.elaborate();
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: true, data: dat });
    } catch (ex) {
      console.log(ex);
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: false });
    }
  });

  fastify.get('/navene', async (request, reply) => {
    logger.debug(`[${process.pid}][${request.id}] Invoking navene`);

    try {
      const jsonData = await dataNavene.elaborate();
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: true, data: jsonData });
    } catch (ex) {
      console.log(ex);
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: false });
    }
  });

  fastify.get('/rivadelgarda', async (request, reply) => {
    logger.debug(`[${process.pid}][${request.id}] Invoking rdg`);

    try {
      const jsonData = await dataRdg.elaborate();
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: true, data: jsonData });
    } catch (ex) {
      console.log(ex);
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: false });
    }
  });

  fastify.get('/torbole', async (request, reply) => {
    logger.debug(`[${process.pid}][${request.id}] Invoking torbole`);

    try {
      const jsonData = await dataCvt.elaborate();
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: true, data: jsonData });
    } catch (ex) {
      console.log(ex);
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: false });
    }
  });

  fastify.get('/campione', async (request, reply) => {
    logger.debug(`[${process.pid}][${request.id}] Invoking campione`);

    try {
      const jsonData = await dataCampione.elaborate();
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: true, data: jsonData });
    } catch (ex) {
      console.log(ex);
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: false });
    }
  });

  fastify.get('/torri', async (request, reply) => {
    logger.debug(`[${process.pid}][${request.id}] Invoking torri`);

    try {
      const jsonData = await dataTorri.elaborate();
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: true, data: jsonData });
    } catch (ex) {
      console.log(ex);
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: false });
    }
  });
};

module.exports = route;
