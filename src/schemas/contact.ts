import * as yup from 'yup';

const contactSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(3, 'First Name should be at least 3 characters')
        .max(255, 'First Name max characters is 255')
        .required('Please fill the First Name'),
    lastName: yup
        .string()
        .min(3, 'Last Name should be at least 3 characters')
        .max(255, 'Last Name max characters is 255')
        .required('Please fill the Last Name'),
    age: yup
        .number()
        .positive('Age must be a positive number')
        .max(100, 'Max age is 100')
        .required('Please fill the Age'),
    photo: yup
        .string()
        .required('Please fill photo url'),
});

export default contactSchema;
