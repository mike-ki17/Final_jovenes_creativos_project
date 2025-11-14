import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/auth.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Register new user
export const register = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    if (!email || !password || !nombre) {
      return res.status(400).json({ message: 'Faltan campos requeridos: email, password, nombre' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
    }

    // Create new user (default role is 'user')
    const newUser = new User({
      email,
      password,
      nombre,
      rol: 'user'
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Return user without password
    const userResponse = {
      _id: newUser._id,
      email: newUser.email,
      nombre: newUser.nombre,
      rol: newUser.rol,
      fechaCreacion: newUser.fechaCreacion
    };

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: userResponse,
      token
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
    }
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y password son requeridos' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return user without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
      fechaCreacion: user.fechaCreacion
    };

    res.status(200).json({
      message: 'Login exitoso',
      user: userResponse,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').populate('favoritos', 'titulo imagenPortada genero plataforma');
    
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
        favoritos: user.favoritos,
        fechaCreacion: user.fechaCreacion
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};

// Create admin (only if no admin exists)
export const createAdmin = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    if (!email || !password || !nombre) {
      return res.status(400).json({ message: 'Faltan campos requeridos: email, password, nombre' });
    }

    // Check if any admin exists
    const existingAdmin = await User.findOne({ rol: 'admin' });
    if (existingAdmin) {
      return res.status(403).json({ message: 'Ya existe un administrador. Solo puede haber uno.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
    }

    // Create admin user
    const newAdmin = new User({
      email,
      password,
      nombre,
      rol: 'admin'
    });

    await newAdmin.save();

    // Generate token
    const token = generateToken(newAdmin._id);

    const userResponse = {
      _id: newAdmin._id,
      email: newAdmin.email,
      nombre: newAdmin.nombre,
      rol: newAdmin.rol,
      fechaCreacion: newAdmin.fechaCreacion
    };

    res.status(201).json({
      message: 'Administrador creado correctamente',
      user: userResponse,
      token
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
    }
    res.status(500).json({ message: 'Error al crear administrador', error: error.message });
  }
};

