import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favourites: [
    
  ],
  
};
const favouritesSlice = createSlice({
  name: 'userFavorite',
  initialState,
  reducers: {
    addToFav: (state, action) => {
        console.log('addToFav ==>state',state);
        console.log('addToFav ==>payload',action.payload);
        // state.favourites.push(action.payload);
        const item = action.payload;
        console.log('State before adding:', state); // Debugging line
        if (!state.favourites?.find(fav => fav.id === item.id)) {
          state.favourites.push(item);
        }
        console.log('State after adding:', state); // Debugging line
    },
    removeFromFav: (state, action) => {
        console.log('State before removing:', state); // Debugging line
        const updatedState = state.favourites.filter(item => item.id !== action.payload.id);
        console.log('State after removing:', updatedState); // Debugging line
        state.favourites = updatedState
    },
  },
});
export const {addToFav, removeFromFav} = favouritesSlice.actions;
export const reducer = favouritesSlice.reducer;