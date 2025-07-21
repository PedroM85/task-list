// components/snack/SnackProvider.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import SnackbarAlert from './snackbar';

interface SnackContextProps {
    showSnack: (message: string, severity?: 'error' | 'success' | 'info' | 'warning') => void;
}

const SnackContext = createContext<SnackContextProps | undefined>(undefined);

export const SnackProvider = ({ children }: { children: ReactNode }) => {
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [snackSeverity, setSnackSeverity] = useState<'error' | 'success' | 'info' | 'warning'>('info');

    const showSnack = (
        message: string,
        severity: 'error' | 'success' | 'info' | 'warning' = 'error'
    ) => {
        setSnackMessage(message);
        setSnackSeverity(severity);
        setSnackOpen(true);
    };
    const handleClose = () => {
        setSnackOpen(false);
    };

    return (
        <SnackContext.Provider value={{ showSnack }}>
            {children}
            <SnackbarAlert
                open={snackOpen}
                message={snackMessage}
                severity={snackSeverity}
                onClose={handleClose}
            />
        </SnackContext.Provider>
    );
};

export const useSnack = (): SnackContextProps => {
    const context = useContext(SnackContext);
    if (!context) {
        throw new Error('useSnack debe usarse dentro de un <SnackProvider>');
    }
    return context;
};
