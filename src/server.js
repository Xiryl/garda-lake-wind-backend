const fastify = require('fastify')({
  ignoreTrailingSlash: true,
  bodyLimit: 12485760, // === 10MB
});
const path = require('path');
const logger = require('./utils/logger');
require('dotenv').config();

const swaggerConfig = require('./config/swagger');

// =============================================================================
// FASTIFY CONFIG
// =============================================================================
fastify.http2 = process.env.API_HTTP2_SUPPORT;
fastify.register(require('fastify-swagger'), swaggerConfig.options);

fastify.register(require('fastify-cors'), { origin: '*' });
// =============================================================================
// FASTIFY LOAD
// =============================================================================
/**
 * V1 -> No authentication
 */

fastify.register(require('./routes/v1/openapi'), { prefix: 'api/v1' });

// =============================================================================
// FASTIFY LOGGER MIDDLEWARE
// =============================================================================
fastify.addHook('preHandler', async (req) => {
  logger.verbose(`[${process.pid}][${req.id}] API --> ${req.method} ${req.url}`);
});

module.exports = fastify;
