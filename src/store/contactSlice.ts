import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ContactService from '../services/ContactService';
import { Contact, ContactWithID } from '../types/Contact';

type UpdateContact = {
    id: string;
    body: Contact;
};

export interface ContactState {
    contact: Contact;
    contacts: ContactWithID[];
    isListLoading: boolean;
    isSingleLoading: boolean;
    isCreateLoading: boolean;
    isUpdateLoading: boolean;
    isDeleteLoading: boolean;
}

export const CONTACT_INITIAL_STATE: ContactState = {
    contact: {
        firstName: '',
        lastName: '',
        age: 0,
        photo: '',
    },
    contacts: [],
    isListLoading: false,
    isSingleLoading: false,
    isCreateLoading: false,
    isUpdateLoading: false,
    isDeleteLoading: false,
};

export const fetchContacts = createAsyncThunk('get-contacts', async () => {
    const response = await ContactService.getContacts();
    return response.data.data;
});

export const fetchContact = createAsyncThunk(
    'get-contact',
    async (contactId: string) => {
        const response = await ContactService.getContact(contactId);
        return response.data.data;
    }
);

export const createContact = createAsyncThunk(
    'create-contact',
    async (payload: Contact) => {
        const response = await ContactService.createContact(payload);
        return response.data.data;
    }
);

export const updateContact = createAsyncThunk(
    'update-contact',
    async (payload: UpdateContact) => {
        const response = await ContactService.updateContact(
            payload.id,
            payload.body
        );
        return response.data.data;
    }
);

export const deleteContact = createAsyncThunk(
    'delete-contact',
    async (contactId: string) => {
        const response = await ContactService.deleteContact(contactId);
        return response.data.data;
    }
);

export const contactSlice = createSlice({
    name: 'contact',
    initialState: CONTACT_INITIAL_STATE,
    reducers: {},
    extraReducers: builder => {
        // get list
        builder.addCase(fetchContacts.pending, state => ({
            ...state,
            isListLoading: true,
        }));
        builder.addCase(fetchContacts.fulfilled, (state, action) => ({
            ...state,
            contacts: action.payload,
            isListLoading: false,
        }));
        builder.addCase(fetchContacts.rejected, state => ({
            ...state,
            isListLoading: false,
        }));

        // get single
        builder.addCase(fetchContact.pending, state => ({
            ...state,
            isSingleLoading: true,
        }));
        builder.addCase(fetchContact.fulfilled, (state, action) => ({
            ...state,
            contact: action.payload,
            isSingleLoading: false,
        }));
        builder.addCase(fetchContact.rejected, state => ({
            ...state,
            isSingleLoading: false,
        }));

        // create
        builder.addCase(createContact.pending, state => ({
            ...state,
            isCreateLoading: true,
        }));
        builder.addCase(createContact.fulfilled, state => ({
            ...state,
            isCreateLoading: false,
        }));
        builder.addCase(createContact.rejected, state => ({
            ...state,
            isCreateLoading: false,
        }));

        // update
        builder.addCase(updateContact.pending, state => ({
            ...state,
            isUpdateLoading: true,
        }));
        builder.addCase(updateContact.fulfilled, state => ({
            ...state,
            isUpdateLoading: false,
        }));
        builder.addCase(updateContact.rejected, state => ({
            ...state,
            isUpdateLoading: false,
        }));

        // delete
        builder.addCase(deleteContact.pending, state => ({
            ...state,
            isDeleteLoading: true,
        }));
        builder.addCase(deleteContact.fulfilled, state => ({
            ...state,
            isDeleteLoading: false,
        }));
        builder.addCase(deleteContact.rejected, state => ({
            ...state,
            isDeleteLoading: false,
        }));
    },
});

export default contactSlice.reducer;
