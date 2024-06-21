import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'service1',
      version: '1.0.0'
    }
  },
  apis: ['./routes/*.js']
}

const specs = swaggerJsdoc(options)

const useSawagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}

export default useSawagger
