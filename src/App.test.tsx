import { fireEvent, waitFor } from '@testing-library/react';

import App from './App';
import ContactService from './services/ContactService';
import renderWithProvider from './utils/renderWithProvider';
import { CONTACT_INITIAL_STATE } from './store/contactSlice';

const CONTACT_DUMMY_DATA = [
    {
        id: '121njdns-jnfjn12-jenfjn12-jasndja2',
        firstName: 'Jono',
        lastName: 'Joni',
        age: 20,
        photo: '-',
    },
];

jest.mock('./config/index', () => ({
    api: { url: 'be.url.com' },
}));

describe('Contacts App', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    beforeEach(() => {
        jest.spyOn(ContactService, 'getContacts').mockResolvedValue({
            data: CONTACT_DUMMY_DATA,
            message: 'yes',
        });
        jest.spyOn(ContactService, 'getContact').mockResolvedValue({
            data: CONTACT_DUMMY_DATA[0],
            message: 'yes',
        });
        jest.spyOn(ContactService, 'createContact').mockResolvedValue({});
        jest.spyOn(ContactService, 'updateContact').mockResolvedValue({});
    });

    it('should be rendered on initial load', () => {
        const { getByText } = renderWithProvider(<App />);

        const appTitle = getByText('Contacts App');
        // title is rendered
        expect(appTitle).toBeInTheDocument();
    });

    it('should be able to open Add New Contact form modal', async () => {
        const { getByTestId, findByTestId } = renderWithProvider(<App />);

        const addBtn = getByTestId('add-new-contact-btn');

        // add new contact button is there
        expect(addBtn).toBeInTheDocument();

        // click add new contact button
        fireEvent.click(addBtn);

        const contactModal = await waitFor(() => findByTestId('contact-modal'));

        // contact modal should be opened
        await waitFor(() => expect(contactModal).toBeInTheDocument());
    });

    it('should be able to add new contact', async () => {
        const { getByTestId, findByTestId } = renderWithProvider(<App />);

        const addBtn = getByTestId('add-new-contact-btn');

        // add new contact button is there
        expect(addBtn).toBeInTheDocument();

        // click add new contact button
        fireEvent.click(addBtn);

        const contactModal = await waitFor(() => findByTestId('contact-modal'));

        // contact modal should be opened
        await waitFor(() => expect(contactModal).toBeInTheDocument());

        const firstNameInput = await waitFor(() =>
            findByTestId('first-name-input')
        );
        const lastNameInput = await waitFor(() =>
            findByTestId('last-name-input')
        );
        const ageInput = await waitFor(() => findByTestId('age-input'));
        const photoInput = await waitFor(() => findByTestId('photo-input'));

        // form is also there
        await waitFor(
            () => expect(firstNameInput).toBeInTheDocument(),
            expect(lastNameInput).toBeInTheDocument()
        );
        await waitFor(
            () => expect(ageInput).toBeInTheDocument(),
            expect(photoInput).toBeInTheDocument()
        );

        // fill in the forms
        fireEvent.change(
            firstNameInput.querySelector('input') as HTMLInputElement,
            {
                target: { name: 'firstName', value: 'firstName' },
            }
        );
        fireEvent.change(
            lastNameInput.querySelector('input') as HTMLInputElement,
            {
                target: {
                    name: 'lastName',
                    value: 'lastName',
                },
            }
        );
        fireEvent.change(ageInput.querySelector('input') as HTMLInputElement, {
            target: { name: 'age', value: 20 },
        });
        fireEvent.change(
            photoInput.querySelector('input') as HTMLInputElement,
            {
                target: { name: 'photo', value: 'N/A' },
            }
        );

        // value is changed
        await waitFor(
            () =>
                expect(
                    firstNameInput.querySelector('input')
                ).toHaveDisplayValue('firstName'),
            expect(lastNameInput.querySelector('input')).toHaveDisplayValue(
                'lastName'
            )
        );
        await waitFor(
            () =>
                expect(ageInput.querySelector('input')).toHaveDisplayValue(20),
            expect(photoInput.querySelector('input')).toHaveDisplayValue('N/A')
        );

        const saveBtn = getByTestId('save-btn');

        // save button is there and enabled
        expect(saveBtn).toBeInTheDocument();
        expect(saveBtn).toBeEnabled();

        // click save button
        fireEvent.click(saveBtn);

        // contact modal should be closed after clicking save
        await waitFor(() => expect(contactModal).not.toBeInTheDocument());
    });

    it('should be able to update any existing contact', async () => {
        const { getByTestId, findByTestId } = renderWithProvider(<App />, {
            contact: {
                ...CONTACT_INITIAL_STATE,
                contacts: CONTACT_DUMMY_DATA,
                contact: CONTACT_DUMMY_DATA[0],
            },
        });

        const updateBtn = await waitFor(() =>
            findByTestId('update-button-row-0')
        );

        // update contact button is there
        expect(updateBtn).toBeInTheDocument();

        // click update contact button
        fireEvent.click(updateBtn);

        const contactModal = await waitFor(() => findByTestId('contact-modal'));

        // contact modal should be opened
        await waitFor(() => expect(contactModal).toBeInTheDocument());

        const firstNameInput = await waitFor(() =>
            findByTestId('first-name-input')
        );

        // form is also there
        await waitFor(() => expect(firstNameInput).toBeInTheDocument());

        // initial value
        await waitFor(() =>
            expect(firstNameInput.querySelector('input')).toHaveDisplayValue(
                'Jono'
            )
        );

        // fill in the forms
        fireEvent.change(
            firstNameInput.querySelector('input') as HTMLInputElement,
            {
                target: { name: 'firstName', value: 'update' },
            }
        );

        // value is changed
        await waitFor(() =>
            expect(firstNameInput.querySelector('input')).toHaveDisplayValue(
                'update'
            )
        );

        const saveBtn = getByTestId('save-btn');

        // save button is there and enabled
        expect(saveBtn).toBeInTheDocument();
        expect(saveBtn).toBeEnabled();

        // click save button
        fireEvent.click(saveBtn);

        // contact modal should be closed after clicking save
        await waitFor(() => expect(contactModal).not.toBeInTheDocument());
    });
});
