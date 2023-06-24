/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CONTACT_INITIAL_STATE } from '../store/contactSlice';

const INITIAL_STATE = { contact: CONTACT_INITIAL_STATE };
const middleware = getDefaultMiddleware();
const mockStore = configureStore(middleware);

const renderWithProvider = (
    ui: React.ReactElement,
    initialState: any = INITIAL_STATE
) => {
    const store = mockStore(initialState);
    return render(<Provider store={store}>{ui}</Provider>);
};

export default renderWithProvider;
