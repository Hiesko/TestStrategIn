import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }, {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
      }
      });
      const { token, userId } = response.data;

      // Stocker le token et l'ID de l'utilisateur dans le stockage local pour une utilisation ultérieure
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Rediriger l'utilisateur vers la page users
      window.location.replace('/users');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p>{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
