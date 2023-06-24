import Typography from '@mui/material/Typography';

import AppBar from './components/AppBar';
import AppBarContainer from './components/AppBarContainer';
import AppBarToolbar from './components/AppBarToolbar';

const Navbar = () => (
    <AppBar>
        <AppBarContainer maxWidth='xl'>
            <AppBarToolbar disableGutters>
                <Typography variant='h1' color='white'>
                    Contacts App
                </Typography>
            </AppBarToolbar>
        </AppBarContainer>
    </AppBar>
);

export default Navbar;
