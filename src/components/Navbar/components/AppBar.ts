import { styled } from '@mui/material';
import MUIAppBar from '@mui/material/AppBar';

const AppBar = styled(MUIAppBar)(({ theme }) => ({
    position: 'absolute',
    boxShadow: 'none',
    width: 'inherit',
    backgroundColor: theme.palette.primary.main,
    color: 'rgba(255, 255, 255, 0.87)',
}));

export default AppBar;
