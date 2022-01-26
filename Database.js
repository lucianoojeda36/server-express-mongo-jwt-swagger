// import mongoose from 'mongoose';

// const uri = 'mongodb://localhost:27017/servidor-prueba';
// const options = { useNewUrlParser: true, useCreateIndex: true };

// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }).then(
//   () => {
//     console.log('conectado a db');
//   },
//   err => {
//     console.log('error');
//   }
// );

import mongoose from 'mongoose';

export default async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/servidor-prueba');
    console.log('DATABASE IS CONECTED ON PORT 27017');
  } catch (err) {
    console.log(err);
  }
}
