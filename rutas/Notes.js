import express from 'express';
export const router = express.Router();
import { verificarAuth } from '../middlewares/autenticacion.js';
import Nota from '../schemas/Notas.js';

router.post('/nueva-nota', verificarAuth, async (req, res) => {
  const body = req.body;

  body.usuarioId = req.usuario._id;

  try {
    const notaDB = await Nota.create(body);
    res.status(200).json(notaDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error,
    });
  }
});

router.get('/nota', verificarAuth, async (req, res) => {
  const usuarioId = req.usuario._id;

  try {
    const notaDb = await Nota.find({ usuarioId });
    res.json(notaDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error,
    });
  }
});
