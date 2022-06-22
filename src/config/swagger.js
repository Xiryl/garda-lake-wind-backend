/**
 * Configuration file for the swagger (openapi) autogenerating documentation
 */

exports.options = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'GARDA LAKE WIND RESTAPI SERVER',
      description: 'REST API - official documentation',
      version: '1.1.0',
    },
    externalDocs: {
      description: 'For more info read project documentation',
    },
    host: 'chiarani.it',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
};
