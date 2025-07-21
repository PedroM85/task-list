// export default MainLayout;
import React from 'react';
import Button from '@mui/material/Button';

interface MainLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const MainLayout = ({ children, onLogout }: MainLayoutProps) => {
  return (
    <div className="app-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#87ceeb', color: 'white' }}>
        <h1>Task List</h1>
        <Button variant="contained" color="error" onClick={onLogout}>
          Cerrar sesión
        </Button>
      </header>
      <main>{children}</main>
      <footer style={{ backgroundColor: '#87ceeb', color: 'black', padding: '1rem', textAlign: 'right' }}>
        <p>© 2025 insightt</p>
      </footer>
    </div>
  );
};

export default MainLayout;
