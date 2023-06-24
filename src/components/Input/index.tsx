import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField/TextField';
import type { UseFormRegister } from 'react-hook-form';

type InputProps = TextFieldProps & {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
};

const Input = (props: InputProps) => {
    const { register, name, error, ...rest } = props;
    return (
        <TextField
            {...register(name)}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: error ? 'red' : 'rgba(0, 0, 0, 0.23)',
                    },
                },
            }}
            error={error}
            {...rest}
        />
    );
};

export default Input;
