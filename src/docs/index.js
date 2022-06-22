import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      openapi: "3.0.3",
      title: "Barefoot nomad",
      version: "1.0.0",
      description:
        "Welcome to Barefoot Nomad global travel and accommodation easy",
      servers: ["/api"],
    },
  },
  apis: ["src/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
