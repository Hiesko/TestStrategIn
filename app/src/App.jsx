import { Router, Route, Routes } from 'react-router-dom';
import Register from '../components/RegisterForm';
import Login from '../components/Login';
import ListUsers from '../components/List';
import NotFoundPage from '../components/NotFoundPage';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function App() {

  return (
  <Router location={history.location} navigator={history}>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<ListUsers />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
  )
}

export default App
