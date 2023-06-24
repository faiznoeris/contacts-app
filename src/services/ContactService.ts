import api from '../api';
import ENDPOINT from '../api/endpoint';

import { Contact } from '../types/Contact';

const getContacts = () => api.get(ENDPOINT.CONTACT);
const getContact = (id: string) => api.get(`${ENDPOINT.CONTACT}/${id}`);

const createContact = (payload: Contact) => api.post(ENDPOINT.CONTACT, payload);

const updateContact = (id: string, payload: Contact) =>
    api.put(`${ENDPOINT.CONTACT}/${id}`, payload);

const deleteContact = (id: string) => api.delete(`${ENDPOINT.CONTACT}/${id}`);

export default {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
};
