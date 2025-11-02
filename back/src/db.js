import mongoose from 'mongoose';
import { DB_USER, DB_PASSWORD, DB_NAME ,DB_HOST, DB_CLUSTER } from "./config.js";

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?appName=${DB_CLUSTER}&retryWrites=true&w=majority`;

const options = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    }
};

export const connectDB = async () => {
  try {
    // Mongoose.connect devuelve una promesa
    await mongoose.connect(uri, options);
    
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    process.exit(1); // Detiene la app si no se puede conectar
  }
};