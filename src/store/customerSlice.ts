/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  name: string;
  title: string;
  address: string;
}

const initialState: Customer | null = null;

export const customerSlice = createSlice<
  Customer | null,
  {
    setSelectedCustomer: (
      state: Customer | null,
      action: PayloadAction<Customer>
    ) => void;
  },
  any,
  any
>({
  name: "customer",
  initialState,
  reducers: {
    setSelectedCustomer: (_, action: PayloadAction<Customer>) => {
      return action.payload;
    },
  },
});

export const { setSelectedCustomer } = customerSlice.actions;

export default customerSlice.reducer;
