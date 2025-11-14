import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { connectDB } from '../db.js';

const seedAdmin = async () => {
  try {
    console.log('Conectando a MongoDB Atlas...');
    await connectDB();
    console.log('Conexión exitosa.');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ rol: 'admin' });
    if (existingAdmin) {
      console.log('Ya existe un administrador en la base de datos.');
      console.log(`Email: ${existingAdmin.email}`);
      await mongoose.disconnect();
      return;
    }

    // Crear usuario admin por defecto
    const adminData = {
      email: 'admin@gameTracker.com',
      password: 'admin123', // Se hasheará automáticamente
      nombre: 'Administrador',
      rol: 'admin'
    };

    console.log('Creando usuario administrador...');
    const admin = new User(adminData);
    await admin.save();

    console.log('¡Usuario administrador creado con éxito!');
    console.log(`Email: ${adminData.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log('IMPORTANTE: Cambia la contraseña después del primer inicio de sesión.');

  } catch (error) {
    console.error('Error creando usuario administrador:', error);
  } finally {
    console.log('Cerrando conexión...');
    await mongoose.disconnect();
    console.log('Conexión cerrada.');
  }
};

seedAdmin();

