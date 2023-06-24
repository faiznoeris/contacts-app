import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import Navbar from './components/Navbar';
import ContactList from './components/ContactList';
import ContactModal from './components/ContactModal';
import ContactDeleteDialog from './components/ContactDeleteDialog';

import { fetchContacts } from './store/contactSlice';
import { AppDispatch, RootState } from './store';

const HomePage = () => {
    const data = useSelector((state: RootState) => state.contact);
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [idDelete, setIdDelete] = useState<string | null>(null);

    const handleOpen = (userId: string | null) => () => {
        setOpen(true);
        if (userId) setId(userId);
    };

    const handleClose = () => {
        setOpen(false);
        setId(null);
    };

    const handleOpenDelete = (contactId: string | null) => () => {
        setOpenDelete(true);
        if (contactId) setIdDelete(contactId);
    };

    const handleCloseDelete = () => setOpenDelete(false);

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
                            variant='contained'
                            onClick={handleOpen(null)}
                            startIcon={<AddIcon />}
                        >
                            Add New Contact
                        </Button>
                    </Grid>
                </Grid>
                <ContactList
                    data={data.contacts}
                    handleOpen={handleOpen}
                    handleOpenDelete={handleOpenDelete}
                    isLoading={data?.isListLoading}
                />
            </Box>
            <ContactModal
                handleClose={handleClose}
                open={open}
                id={id}
            />
            <ContactDeleteDialog
                handleClose={handleCloseDelete}
                open={openDelete}
                id={idDelete}
            />
        </Box>
    );
};

export default HomePage;
