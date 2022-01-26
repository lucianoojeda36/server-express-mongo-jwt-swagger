import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const roles = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} no es un rol válido',
};

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  email: { type: String, unique: true, required: [true, 'Email es necesario'] },
  pass: { type: String, required: [true, 'Pass es necesario'] },
  date: { type: Date, default: Date.now },
  role: { type: String, default: 'USER', enum: roles },
  activo: { type: Boolean, default: true },
});

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.pass;
  return obj;
};

userSchema.plugin(uniqueValidator, { message: 'Error, esperaba {PATH} único.' });

const User = mongoose.model('User', userSchema);

export default User;
