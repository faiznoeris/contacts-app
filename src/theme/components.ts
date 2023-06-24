const components = {
    MuiButton: {
        styleOverrides: {
            root: {
                height: 'fit-content',
                // @: https://github.com/mui/material-ui/issues/16307#issuecomment-902344903
                textTransform: 'unset' as const,
                borderRadius: '7px',
            },
        },
    },
    MuiFormLabel: {
        styleOverrides: {
            root: {
                fontWeight: 500,
                marginBottom: '5px',
            },
        },
    },
    MuiInputBase: {
        styleOverrides: {
            root: {
                borderRadius: '7px !important',
            },
            input: {
                padding: '8.5px 9px !important',
            },
        },
    },
};

export default components;
