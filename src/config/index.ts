// @: https://stackoverflow.com/a/74882007
const { VITE_BACKEND_URL: BE_URL } = import.meta.env;

const config = {
    api: {
        url: BE_URL,
    },
};

export default config;
