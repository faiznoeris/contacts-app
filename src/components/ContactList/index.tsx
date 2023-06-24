import { useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import { RootState } from '../../store';

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
        <Box sx={{ overflow: 'auto' }}>
            <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
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
                            <>
                                <ContactTableHead />
                                <ContactTableBody {...props} data={contacts} />
                            </>
                        )}
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ContactList;
