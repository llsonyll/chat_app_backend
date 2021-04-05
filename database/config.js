const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    console.log('init db database');
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error en la base de datos');
  }
}

module.exports = {
  dbConnection
}