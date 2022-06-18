import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "Barefoot nomad",
      version: "1.0.0",
      description:
        "Welcome to Barefoot Nomad global travel and accommodation easy",
      
    },
    servers: [{
      url: 'http://localhost:3000'
    }],
  },
  apis: ["src/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
