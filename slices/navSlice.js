import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userorigin: null,
    origin: null,
    destination: null,
    travelTimeInformation: null
}

export const navSlice = createSlice ({
    name: 'nav',
    initialState,
    reducers: {
        setUserOrigin: (state, action) => {
            state.userorigin = action.payload;
        },
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        },
    }
});

export const { setUserOrigin, setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

// Selectors

export const selectUserOrigin = (state) => state.nav.userorigin;
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;