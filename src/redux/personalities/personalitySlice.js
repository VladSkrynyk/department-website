import { createSlice } from "@reduxjs/toolkit";

const personalitySlice = createSlice({
  name: "personality",
  initialState: { editingPersonality: null },
  reducers: {
    setEditingPersonality: (state, action) => {
      state.editingPersonality = action.payload;
    },
    clearEditingPersonality: (state) => {
      state.editingPersonality = null;
    },
  },
});

export const { setEditingPersonality, clearEditingPersonality } = personalitySlice.actions;
export default personalitySlice.reducer;
