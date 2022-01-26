import express from 'express';
export const router = express.Router();
import User from '../schemas/User.js';
import bcrypt from 'bcrypt';
import _ from 'underscore';
import { verificarAuth, verificarRol } from '../middlewares/autenticacion.js';
0;

const saltRounds = 10;

router.get('/', verificarAuth, async (req, res) => {
  try {
    const userDb = await User.findById(req.user.data._id);
    return res.status(200).json(userDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'no se ha encontrado el usuario',
      error,
    });
  }
});

router.put('/usuario/:id', [verificarAuth, verificarRol], async (req, res) => {
  let body = _.pick(req.body, ['nombre', 'email', 'role', 'pass']);
  let id = req.params.id;

  if (body.pass) {
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
  }

  try {
    const usuarioDb = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    return res.json(usuarioDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'ocurrio un error',
      error,
    });
  }
});

router.delete('/usuario/:id', [verificarAuth, verificarRol], async (req, res) => {
  let id = req.params.id;
  try {
    const usuarioDelete = await User.findByIdAndDelete(id);
    if (!usuarioDelete) {
      return res.status(400).json({
        mensaje: 'usuario no encontrado',
      });
    }
    return res.status(200).json(usuarioDelete);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'ocurrio un error',
      error,
    });
  }
});
