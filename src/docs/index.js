import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Barefoot nomad",
      version: "1.0.0",
      description:
        "Welcome to Barefoot Nomad global travel and accommodation easy",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "ATLP8 Winners",
        url: "https://winners-c8-bn-be-staging.herokuapp.com/",
      },
    },
    servers: [
      {
        url: "/api",
      },
      {
        url: "https://winners-c8-bn-be-staging.herokuapp.com/api",
      },
    ],
    components: {
      securitySchemes: {
        BearerToken: {
          type: "apiKey",
          in: "header",
          name: "authorization",
        },
      },
    },
  },
  apis: ["src/**/*.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
