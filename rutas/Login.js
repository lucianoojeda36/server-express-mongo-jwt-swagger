import express from 'express';
export const router = express.Router();
import User from '../schemas/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of task
 *        name:
 *          type: string
 *          description: the name of the task
 *        description:
 *          type: string
 *          description: the description of the task
 *      required:
 *        - name
 *        - description
 *      example:
 *        id: gQBOyGbxcQy6tEp0aZ78X
 *        name: My first Task
 *        description: I have to do Something
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found task
 *      example:
 *        msg: Task was not found
 *
 *  parameters:
 *    taskId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the task id
 */
/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Tasks endpoint
 */
/**
 * @swagger
 * /login:
 *  post:
 *    summary: Return the user that login
 *    tags: [login]
 *    responses:
 *      200:
 *        description: the user thath login
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            examples:
 *              jesica:
 *                value:
 *                  name: jesica
 *                  role: ADMIN
 *                  email: jesica@gmail.com
 */
router.post('/login', async (req, res) => {
  let body = req.body;

  try {
    const usuarioDb = await User.findOne({ email: body.email });

    if (!usuarioDb) {
      return res.status(400).json({
        mensaje: 'usuario o contraseñas invalidos',
      });
    }

    if (!bcrypt.compareSync(body.pass, usuarioDb.pass)) {
      return res.status(400).json({
        mensaje: 'usuario o contraseña invalidos',
      });
    }

    let token = jwt.sign(
      {
        data: usuarioDb,
      },
      'pedro123456',
      { expiresIn: 60 * 60 * 24 * 30 }
    );

    return res.status(200).json({
      usuarioDb,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: 'ocurrio un error',
      error,
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { nombre, email, role, pass } = req.body;

    if (!(email && pass && nombre)) {
      res.status(400).send('All input is required');
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    const encryptedPassword = await bcrypt.hashSync(pass, saltRounds);

    const user = await User.create({
      nombre,
      role,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      pass: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id, email }, 'pedro123456', {
      expiresIn: '2h',
    });

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({
      mensaje: 'ocurrio un error',
      err,
    });
  }
});
