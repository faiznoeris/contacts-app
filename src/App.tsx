import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import Navbar from './components/Navbar';
import ContactList from './components/ContactList';
import ContactModal from './components/ContactModal';
import ContactDeleteDialog from './components/ContactDeleteDialog';

import { fetchContacts, closeAlert } from './store/contactSlice';
import { AppDispatch, RootState } from './store';

const HomePage = () => {
    const { isAlertOpen, alertMessage } = useSelector(
        (state: RootState) => state.contact
    );
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [idDelete, setIdDelete] = useState<string | null>(null);

    const handleOpen = useCallback(
        (userId: string | null) => () => {
            setOpen(true);
            if (userId) setId(userId);
        },
        [setOpen, setId]
    );

    const handleClose = useCallback(() => {
        setOpen(false);
        setId(null);
    }, [setOpen, setId]);

    const handleOpenDelete = useCallback(
        (contactId: string | null) => () => {
            setOpenDelete(true);
            if (contactId) setIdDelete(contactId);
        },
        [setOpenDelete, setIdDelete]
    );

    const handleCloseAlert = useCallback(() => {
        dispatch(closeAlert());
    }, [dispatch]);

    const handleCloseDelete = useCallback(
        () => setOpenDelete(false),
        [setOpenDelete]
    );

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            <Navbar />
            <Box padding={8}>
                <Grid mt={10} display='flex' justifyContent='space-between'>
                    <Grid>
                        <Typography variant='h3'>Contact List</Typography>
                    </Grid>
                    <Grid>
                        <Button
                            data-testid='add-new-contact-btn'
                            variant='contained'
                            onClick={handleOpen(null)}
                            startIcon={<AddIcon />}
                        >
                            Add New Contact
                        </Button>
                    </Grid>
                </Grid>
                <ContactList
                    handleOpen={handleOpen}
                    handleOpenDelete={handleOpenDelete}
                />
            </Box>
            <ContactModal handleClose={handleClose} open={open} id={id} />
            <ContactDeleteDialog
                handleClose={handleCloseDelete}
                open={openDelete}
                id={idDelete}
            />
            <Grow in={isAlertOpen} timeout='auto'>
                <Alert
                    severity='error'
                    action={
                        <IconButton
                            aria-label='close'
                            color='inherit'
                            size='small'
                            onClick={handleCloseAlert}
                        >
                            <CloseIcon fontSize='inherit' />
                        </IconButton>
                    }
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    {alertMessage}
                </Alert>
            </Grow>
        </Box>
    );
};

export default HomePage;
