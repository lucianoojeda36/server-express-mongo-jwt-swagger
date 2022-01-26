import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { router as indexRouter } from './rutas/Notes.js';
import { router as usersRouter } from './rutas/User.js';
import { router as loginRouter } from './rutas/Login.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import connect from './database.js';
import { swaggerOptions } from './SwaggerOptions.js';

const app = express();
connect();

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'Docu API',
//       version: '1.0.0',
//       description: 'Api documentation from use',
//     },
//   },
//   apis: ['./App.js'],
// };

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// midelware

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas

/**
 * @swagger
 * /pepe:
 * get:
 *   description: get all pepes
 *   responses:
 *    200:
 *      description: Success
 */

app.get('/pepe', (req, res) => {
  return 'hello world';
});

app.use(indexRouter);
app.use(usersRouter);
app.use(loginRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log(`app listen on port ${app.get('puerto')} `);
});
