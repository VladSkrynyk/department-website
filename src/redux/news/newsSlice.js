import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: { editingNews: null },
  reducers: {
    setEditingNews: (state, action) => {
      state.editingNews = action.payload;
    },
    clearEditingNews: (state) => {
      state.editingNews = null;
    },
  },
});

export const { setEditingNews, clearEditingNews } = newsSlice.actions;
export default newsSlice.reducer;
