import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import Profile from './pages/Profile';
import NavBar from './pages/NavBar';

function App() {
  const token = localStorage.getItem('token');  // Check if user is logged in

  return (
    <Router>
      {token && <NavBar />} {/* Show nav only when logged in */}
      <Routes>
        <Route path='/' element={token ? <Navigate to='/users' /> : 
          <Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='register' element={<Register />} />
        {/* Protected routes */}
        <Route path='/users' element={token ? <Users /> : 
          <Navigate to='/login' />} />
        <Route path='/profile' element={token ? <Profile /> :
          <Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App;
