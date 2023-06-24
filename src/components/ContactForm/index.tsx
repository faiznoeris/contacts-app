import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import { AppDispatch, RootState } from '../../store';
import Skeleton from '../Skeleton';
import Input from '../Input';
import {
    fetchContact,
    fetchContacts,
    createContact,
    updateContact,
    openAlert,
    closeAlert,
} from '../../store/contactSlice';
import { ALERT_DURATION } from '../../constants/alert';
import contactSchema from '../../schemas/contact';
import DispatchResponse from '../../types/DispatchResponse';

interface ContactFormProps {
    id: string | null;
    handleClose: () => void;
}

type FormValues = {
    firstName: string;
    lastName: string;
    age: number;
    photo: string;
};

const ContactForm = (props: ContactFormProps) => {
    const { id, handleClose } = props;
    const { isCreateLoading, isUpdateLoading, isSingleLoading } = useSelector(
        (state: RootState) => state.contact
    );
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            age: 0,
            photo: '',
        },
        resolver: yupResolver(contactSchema),
        mode: 'onChange',
    });
    const dispatch = useDispatch<AppDispatch>();

    const data = useSelector((state: RootState) => state.contact);
    const { contact } = data;

    const isSubmitBtnDisabled = Object.keys(errors).length > 0;
    const modalTitle = useMemo(() => (id ? 'Edit' : 'Add'), [id]);

    useEffect(() => {
        if (id) dispatch(fetchContact(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (id) {
            setValue('firstName', contact?.firstName);
            setValue('lastName', contact?.lastName);
            setValue('age', contact?.age);
            setValue('photo', contact?.photo);
        }
    }, [contact, setValue, id]);

    const handleFinish = useCallback(
        (values: FormValues) => {
            let alertObj = {
                message: 'Data has been updated successfully',
                type: 'success',
            };
            if (id) {
                dispatch(
                    updateContact({
                        id,
                        body: {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            age: Number(values.age),
                            photo: values.photo,
                        },
                    })
                ).then(resp => {
                    reset();
                    handleClose();
                    dispatch(fetchContacts());
                    if ((resp as DispatchResponse).error) {
                        alertObj = {
                            message:
                                (resp as DispatchResponse).error.message || '',
                            type: 'error',
                        };
                    }
                    dispatch(openAlert(alertObj));
                    setTimeout(() => {
                        dispatch(closeAlert());
                    }, ALERT_DURATION);
                });
                return;
            }

            alertObj.message = 'Data has been created successfully'
            dispatch(
                createContact({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    age: Number(values.age),
                    photo: values.photo,
                })
            ).then(resp => {
                reset();
                handleClose();
                dispatch(fetchContacts());
                if ((resp as DispatchResponse).error) {
                    alertObj = {
                        message: (resp as DispatchResponse).error.message || '',
                        type: 'error',
                    };
                }
                dispatch(openAlert(alertObj));
                setTimeout(() => {
                    dispatch(closeAlert());
                }, ALERT_DURATION);
            });
        },
        [dispatch, id, reset, handleClose]
    );

    return (
        <Box>
            <Typography variant='h3'>{modalTitle} Contact</Typography>
            <form onSubmit={handleSubmit(handleFinish)}>
                <Box display='flex' flexDirection='column'>
                    <FormControl variant='standard' sx={{ marginTop: '25px' }}>
                        <Stack spacing={2} direction='row'>
                            <Skeleton
                                isLoading={isSingleLoading}
                                skeletonProps={{
                                    variant: 'circular',
                                    width: 62,
                                    height: 62,
                                }}
                            >
                                <>
                                    <Avatar
                                        src={getValues().photo}
                                        sx={{ width: 62, height: 62 }}
                                    />
                                    <FormControl
                                        variant='standard'
                                        error={!!errors?.photo?.message}
                                        sx={{ width: '100%' }}
                                    >
                                        <FormLabel>Photo</FormLabel>
                                        <Input
                                            data-testid='photo-input'
                                            register={register}
                                            name='photo'
                                            helperText={errors?.photo?.message}
                                            error={!!errors?.photo?.message}
                                        />
                                    </FormControl>
                                </>
                            </Skeleton>
                        </Stack>
                    </FormControl>
                    <FormControl
                        variant='standard'
                        error={!!errors?.firstName?.message}
                        sx={{ marginTop: '25px' }}
                    >
                        <FormLabel>First Name</FormLabel>
                        <Skeleton
                            isLoading={isSingleLoading}
                            skeletonProps={{
                                variant: 'text',
                                width: '100%',
                                height: 62,
                            }}
                        >
                            <Input
                                data-testid='first-name-input'
                                register={register}
                                name='firstName'
                                helperText={errors?.firstName?.message}
                                error={!!errors?.firstName?.message}
                            />
                        </Skeleton>
                    </FormControl>
                    <FormControl
                        variant='standard'
                        error={!!errors?.age?.message}
                        sx={{ marginTop: '15px' }}
                    >
                        <FormLabel>Last Name</FormLabel>
                        <Skeleton
                            isLoading={isSingleLoading}
                            skeletonProps={{
                                variant: 'text',
                                width: '100%',
                                height: 62,
                            }}
                        >
                            <Input
                                data-testid='last-name-input'
                                register={register}
                                name='lastName'
                                helperText={errors?.lastName?.message}
                                error={!!errors?.lastName?.message}
                            />
                        </Skeleton>
                    </FormControl>
                    <FormControl
                        variant='standard'
                        error={!!errors?.age?.message}
                        sx={{ marginTop: '15px' }}
                    >
                        <FormLabel>Age</FormLabel>
                        <Skeleton
                            isLoading={isSingleLoading}
                            skeletonProps={{
                                variant: 'text',
                                width: '100%',
                                height: 62,
                            }}
                        >
                            <Input
                                data-testid='age-input'
                                register={register}
                                name='age'
                                helperText={errors?.age?.message}
                                error={!!errors?.age?.message}
                                type='number'
                            />
                        </Skeleton>
                    </FormControl>
                    <FormControl variant='standard' sx={{ marginTop: '40px' }}>
                        <Stack spacing={2} direction='row'>
                            <Button
                                variant='outlined'
                                onClick={handleClose}
                                fullWidth
                            >
                                Cancel
                            </Button>
                            <Button
                                data-testid='save-btn'
                                type='submit'
                                disabled={
                                    isSubmitBtnDisabled ||
                                    isSingleLoading ||
                                    isCreateLoading ||
                                    isUpdateLoading
                                }
                                variant='contained'
                                fullWidth
                            >
                                Save
                            </Button>
                        </Stack>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};

export default ContactForm;
