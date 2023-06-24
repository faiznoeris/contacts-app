import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AppDispatch } from '../../store';
import {
    deleteContact,
    fetchContacts,
    openAlert,
    closeAlert,
} from '../../store/contactSlice';
import { ALERT_DURATION } from '../../constants/alert';
import DispatchResponse from '../../types/DispatchResponse';

interface ContactDeleteDialogProps {
    open: boolean;
    handleClose: () => void;
    id: string | null;
}

const ContactDeleteDialog = (props: ContactDeleteDialogProps) => {
    const { open, handleClose, id } = props;
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = useCallback(() => {
        if (id) {
            dispatch(deleteContact(id)).then(resp => {
                handleClose();
                dispatch(fetchContacts);
                if ((resp as DispatchResponse).error.message) {
                    dispatch(
                        openAlert((resp as DispatchResponse).error.message)
                    );
                    setTimeout(() => {
                        dispatch(closeAlert());
                    }, ALERT_DURATION);
                }
            });
        }
    }, [dispatch, handleClose, id]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            fullWidth
        >
            <DialogTitle id='alert-dialog-title'>Delete Contact</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Are you sure you want to delete this contact?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ContactDeleteDialog;
