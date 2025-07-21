import { BrowserRouter as Router, Routes, Route , useNavigate} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './routes/ProctectedRoute';

function DashboardWithLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <MainLayout onLogout={handleLogout}>
      <Dashboard />
    </MainLayout>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta sin layout */}
        <Route path="/" element={<Login />} />

        {/* Rutas con layout */}
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardWithLayout />
            </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

