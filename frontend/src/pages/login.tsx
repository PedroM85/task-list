import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useSnack } from '../components/SnackProvider';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { showSnack } = useSnack();

    const handleLogin = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login exitoso:', result);
            const token = await result.user.getIdToken();
            localStorage.setItem('token', token);
            showSnack('¡Login exitoso!', 'success');
            navigate('/dashboard');
        } catch (err) {
            showSnack('Login fallido ❌');
            console.error(err);
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                bgcolor: '#f5f5f5', // fondo gris claro
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: 300,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: 'white',
                }}
            >
                <Typography variant="h5" textAlign="center">
                    Iniciar sesión
                </Typography>
                <TextField
                    label="Correo"
                    variant="outlined"                                        
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-cy="email"
                />
                <TextField
                    label="Contraseña"                    
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-cy="password"
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleLogin} 
                    data-cy="login-button"
                >
                    Iniciar sesión
                </Button>
            </Box>
        </Box>
    );
}

