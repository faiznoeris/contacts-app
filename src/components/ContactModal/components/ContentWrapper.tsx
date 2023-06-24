import { styled } from '@mui/material';
import MUIBox from '@mui/material/Box';

const ContentWrapper = styled(MUIBox)(({ theme }) => ({
    [theme.breakpoints.only('xs')]: {
        width: '60%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '400px',
    },
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    padding: '32px',
    boxShadow:
        '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
}));

export default ContentWrapper;
