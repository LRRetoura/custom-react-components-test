import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

interface NotificationSnackbarProps {
    message: string;
    type: 'error' | 'success';
    open: boolean;
    onClose: () => void;
}

export default function NotificationSnackbar(props: NotificationSnackbarProps) {
    const { message, type, open, onClose } = props;
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={4000}
            onClose={onClose}
            open={open}
        >
            <Alert variant="filled" severity={type} sx={{ width: '100%' }}>
                <AlertTitle>{type === 'error' ? 'Fehler' : 'Erfolg'}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};
