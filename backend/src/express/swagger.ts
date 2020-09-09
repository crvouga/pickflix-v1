import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import configuration from '../configuration';

const swaggerDocsOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1',
      title: 'Pickflix',
    },

    servers: [{url: 'http://localhost:' + configuration.PORT}],
  },
  apis: [__dirname + '/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerDocsOptions);

const swaggerUiOptions: swaggerUi.SwaggerUiOptions = {
  customCss: `.swagger-ui .topbar { display: none; }`,
  swaggerOptions: {
    onComplete: () => {
      document.title = 'API Docs';
    },
  },
};

export const useSwaggerDocs = (app: express.Application) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, swaggerUiOptions)
  );
  return app;
};
