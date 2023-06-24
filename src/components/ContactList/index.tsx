import { useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';

import { RootState } from '../../store';

import ContactTableContainer from './components/TableContainer';
import ContactTableHead from './components/TableHead';
import ContactTableBody from './components/TableBody';

interface ContactListProps {
    handleOpen: (id: string) => () => void;
    handleOpenDelete: (id: string) => () => void;
}

const ContactList = (props: ContactListProps) => {
    const { isListLoading, contacts } = useSelector(
        (state: RootState) => state.contact
    );

    return (
        <Box sx={{ overflow: 'auto', marginTop: '15px' }}>
            <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
                <ContactTableContainer>
                    {isListLoading ? (
                        <Grid
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            height='350px'
                        >
                            <CircularProgress />
                        </Grid>
                    ) : (
                        <Table
                            stickyHeader
                            aria-labelledby='tableTitle'
                            sx={{ minWidth: 750 }}
                        >
                            <ContactTableHead />
                            <ContactTableBody {...props} data={contacts} />
                        </Table>
                    )}
                </ContactTableContainer>
            </Box>
        </Box>
    );
};

export default ContactList;
