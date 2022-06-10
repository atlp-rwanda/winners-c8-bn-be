import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Barefoot nomad',
      version: '1.0.0',
      description: 'Welcome to Barefoot Nomad global travel and accommodation easy',
      servers: ['https://localhost:'],
    },
  },
  apis: ['src/docs/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
