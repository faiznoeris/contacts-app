import { styled } from '@mui/material';
import MUITableContainer from '@mui/material/TableContainer';

const TableContainer = styled(MUITableContainer)(({ theme }) => ({
    [theme.breakpoints.only('xs')]: {
        maxHeight: '530px',
    },
    [theme.breakpoints.up('sm')]: {
        maxHeight: '600px',
    },
    '&::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#D9D9D9',
        borderRadius: '6px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: '#F6F6F6',
        borderRadius: '6px',
        height: 0,
        width: 0,
    },
}));

export default TableContainer;
