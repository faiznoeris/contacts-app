import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import { Contact } from '../../types/Contact';

import ContactTableHead from './components/TableHead';
import ContactTableBody from './components/TableBody';

interface ContactListProps {
    data: Contact[];
    handleOpen: (id: string) => () => void;
    handleOpenDelete: (id: string) => () => void;
    isLoading: boolean;
}

const ContactList = (props: ContactListProps) => {
    const { isLoading } = props;
    return (
        <Box sx={{ overflow: 'auto' }}>
            <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                        {isLoading ? (
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
                                <ContactTableBody {...props} />
                            </>
                        )}
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ContactList;
