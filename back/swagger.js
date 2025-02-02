import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',  
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My REST API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes:{
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            },
        },

      schemas: { 
        Users: {  
          type: 'object',
          properties: {
            username: {
              type: 'string',
              example: 'Admin',
            },
            firstname: {
              type: 'string',
              example: 'Admin',
            },
            email: {
              type: 'string',
              example: 'admin@admin.com',
            },
            password: {
              type: 'string',
              example: '123',
            },
          },
        },
        UserSignin: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'admin@admin.com',
                  },
                  password: {
                    type: 'string',
                    example: '123',
                  },
            }
        },
        Product: {
            type: 'object',
            properties: {
                code: {
                    type: 'string',
                    example: '123'
                },
                name: {
                    type: 'string',
                    example: 'Apple phone',
                },
                description: {
                    type: 'string',
                    example: 'I am an Iphone'
                },
                image: {
                    type: 'string',
                    example: 'www.applephone.com'
                },
                category: {
                    type: 'string',
                    example: 'phone'
                },
                price: {
                    type: 'number',
                    example: 650
                },
                quantity: {
                    type: 'number',
                    example: 1
                },
                internalReference: {
                    type: 'string',
                    example: 'phone'
                },
                shellId: {
                    type: 'number',
                    example: 12
                },
                inventoryStatus: { 
                    type: 'string',
                    enum: ['INSTOCK', 'OUTOFSTOCK', 'PREORDER'], 
                    example: 'INSTOCK',
                },
                rating: {
                    type: 'number', 
                    example: 5,
                },
            }
        }
      },
    },
  },
  apis: ['./api/*.js'],  
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
