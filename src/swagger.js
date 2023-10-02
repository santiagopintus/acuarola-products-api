/* For building Swagger docs */
const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

const doc = {
  info: {
    title: "Products API",
    description: "API for managing products",
    version: "1.0.0",
  },
  examples: {
    Product: {
      firstName: "Harry",
      lastName: "Potter",
      email: "harrypotter@email.com",
      favoriteColor: "Red & Yellow",
      birthday: "1980-07-31",
    },
  },
  host: "products-api-44sf.onrender.com",
  basePath: "/",
  schemes: ["https"],
  exclude: ["/api-docs"],
  definitions: {
    Product: {
      type: "object",
      properties: {
        firstName: {
          type: "string",
          default: "Harry",
        },
        lastName: {
          type: "string",
          default: "Potter",
        },
        email: {
          type: "string",
          default: "harrypotter@email.com",
        },
        favoriteColor: {
          type: "string",
          default: "Red & Yellow",
        },
        birthday: {
          type: "string",
          default: "1980-07-31",
          format: "date",
        },
      },
      description:
        "A product object represents a person and their product information.",
      required: ["firstName", "lastName", "email", "favoriteColor", "birthday"],
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
