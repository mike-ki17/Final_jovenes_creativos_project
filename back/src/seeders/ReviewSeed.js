// src/scripts/seed.js

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Review } from '../models/Review.js'; // 1. Importa el Modelo
import { connectDB } from '../db.js';     // 2. Importa la FUNCIÓN de conexión

// 3. --- Configura la ruta a tu JSON (¡CORREGIDO!) ---
const __filename = fileURLToPath(import.meta.url); // Obtiene la ruta de ESTE archivo (seed.js)
const __dirname = path.dirname(__filename);


const jsonPath = path.join(__dirname, '../jsons/Reviews.json');

const seedDB = async () => {
  try {
    // 4. --- Conecta a la BD (UNA SOLA VEZ) ---
    console.log('Conectando a MongoDB Atlas...');
    await connectDB(); // Llama a la función que ya tienes
    console.log('Conexión exitosa.');

    // 5. --- Borra los datos existentes ---
    console.log('Limpiando colección de Games...');
    await Review.deleteMany({});

    // 6. --- Lee tu archivo JSON (con la ruta corregida) ---
    console.log(`Leyendo archivo JSON desde: ${jsonPath}`);
    const reviewsData = fs.readFileSync(jsonPath, 'utf-8');
    const reviews = JSON.parse(reviewsData); // Convierte el string JSON a un objeto

    // 7. --- Inserta los nuevos datos ---
    console.log('Insertando datos...');
    await Review.insertMany(reviews); // insertMany es la mejor opción

    console.log('¡Base de datos "sembrada" (seeded) con éxito!');

  } catch (error) {
    console.error('Error sembrando la base de datos:', error);
  } finally {
    // 8. --- Cierra la conexión ---
    console.log('Cerrando conexión...');
    await mongoose.disconnect();
    console.log('Conexión cerrada.');
  }
};

seedDB();