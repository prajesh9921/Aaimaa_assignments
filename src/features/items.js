import {createSlice} from '@reduxjs/toolkit';


export const ItemcardSlice = createSlice({
  name: 'ItemCard',
  initialState: {"value": []},
  reducers: {
    addData: (state, action) => {
      // state.value = action.payload;
      state.value.push(action.payload);
    },
    deleteItem: (state, action) => {
      const indexToDelete = action.payload;
      state.value.splice(indexToDelete, 1);
    }
  },
});

export const {addData, deleteItem} =
  ItemcardSlice.actions;

export default ItemcardSlice.reducer;
