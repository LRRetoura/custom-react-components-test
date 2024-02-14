import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

export interface Notification {
    message: string;
    type: 'error' | 'success';
}

interface NotificationSnackbarProps {
    notification: Notification;
    open: boolean;
    onClose: () => void;
}

export default function NotificationSnackbar(props: NotificationSnackbarProps) {
    const { notification, open, onClose } = props;
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={4000}
            onClose={onClose}
            open={open}
        >
            <Alert variant="filled" severity={notification.type} sx={{ width: '100%' }}>
                <AlertTitle>{notification.type === 'error' ? 'Fehler' : 'Erfolg'}</AlertTitle>
                {notification.message}
            </Alert>
        </Snackbar>
    );
};
