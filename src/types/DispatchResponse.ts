import { PayloadAction, SerializedError } from '@reduxjs/toolkit';

type DispatchResponse = PayloadAction & { error: SerializedError };

export default DispatchResponse