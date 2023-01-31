const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res, next) => {
    // Récupération des informations d'inscription
    const { email, password } = req.body;
  
    try {
      // Vérification de l'existence d'un utilisateur avec l'email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email déjà utilisé' });
      }
  
      // Hashage du mot de passe
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Création de l'utilisateur
      const user = new User({ email, password: hashedPassword });
      await user.save();
  
      // Réponse de succès
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

exports.login = async (req, res, next) => {
    try{
        // Vérification de l'existence d'un utilisateur avec l'email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // Compare le mot de passe
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        // Génère un token
        const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
        )
        res.status(200).json({
            message: 'Utilisateur connecté !',
            userId: user._id,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
  };

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};