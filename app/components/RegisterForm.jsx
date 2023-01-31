import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/RegisterForm.css';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/register', { email, password }, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
    }
    })
      .then((response) => {
        console.log(response);
        alert('Utilisateur créé avec succès !');
        history.push('/login');
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur lors de la création de l\'utilisateur.');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Mot de passe:
        <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="button" onClick={() => setShowPassword(!showPassword)}> {showPassword ? "Masquer" : "Afficher"} le mot de passe </button>
      <br />
      <input type="submit" value="Créer un compte" />
    </form>
  );
}

export default RegisterForm;