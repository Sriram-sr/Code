import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Shopify API',
      version: '1.0.0',
      description: 'API for managing your E-commerce application'
    },
    basePath: '/api/v1',
    components: {
      responses: {
        UnauthorizedError: {
          description: 'Unauthorized request'
        },
        ForbiddenError: {
          description: 'Forbidden request'
        },
        NotFoundError: {
          description: 'Resource not found'
        }
      }
    }
  },
  apis: ['src/routes/*.ts']
};

const specs = swaggerJsdoc(options);

export default specs;
