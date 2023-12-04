import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import { PORT } from './config.js';

const router = Router()

const swaggerDocs = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Youtube local server',
        variables: {
          port: {
            enum: [PORT],
            default: PORT,
          },
        },
      },
      {
        url: `https://youtube-sx29.onrender.com`,
        description: 'Youtube server'
      },
    ],

    info: {
      version: '1.0.0',
      title: 'Youtube API',
      description: 'Youtube API information',
    },

    components: {
      securitySchemes: {
        Bearer: {
          type: 'apiKey',
          name: 'token',
          in: 'header',
          description: 'access_token',
        },
      },
    },
  },
  apis: [
    `${process.cwd()}/src/swagger/components/*.yaml`,
    `${process.cwd()}/src/swagger/docs/*.yaml`,
  ],
});



router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTU0Njk5MSwiZXhwIjoxNjcxNTcyMTkxfQ.FbK6DAY9KzRXUBHvh6od_Zc5KGvK2fXV7TbWevfA8B0