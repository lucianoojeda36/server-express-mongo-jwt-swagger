import jwt from 'jsonwebtoken';

export const verificarAuth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, 'pedro123456');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export const verificarRol = (req, res, next) => {
  let rol = req.user.data.role;

  if (rol === 'USER') {
    return res.status(401).json({
      mensaje: 'Rol no autorizado',
    });
  }

  next();
};
