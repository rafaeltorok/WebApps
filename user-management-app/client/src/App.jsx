import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import { getValidToken } from './utils/auth';

function App() {
  const [token, setToken] = useState(getValidToken());

  // Helper to update token after login/logout
  const handleAuthChange = () => setToken(getValidToken());

  return (
    <Router>
      <NavBar token={token} onAuthChange={handleAuthChange} /> {/* Always show NavBar */}
      <Routes>
        <Route path='/' element={token ? <Navigate to='/users' /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login onAuthChange={handleAuthChange} />} />
        <Route path='/register' element={<Register onAuthChange={handleAuthChange} />} />
        {/* Protected routes */}
        <Route path='/users' element={token ? <Users onAuthChange={handleAuthChange} /> : <Navigate to='/login' />} />
        <Route path='/profile' element={token ? <Profile /> : <Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App;
