import { createTheme } from '@mui/material/styles';

import palette from './palette';

const theme = createTheme();

const typography = {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    color: palette.text.primary,
    h1: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontWeight: 400,
        color: '#000000',
        fontSize: '30px',
        lineHeight: '39.75px',
        [theme.breakpoints.down('md')]: {
            fontSize: '24px',
            lineHeight: '31.8px',
        },
    },
    h3: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontWeight: 500,
        color: '#000000',
        fontSize: '22px',
        lineHeight: '29.15px',
    },
};

export default typography;
