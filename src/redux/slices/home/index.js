import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inviteCode: "",
  emailVerified: false,
  displayAnnouncement: true,
  selectedEntity: {},
  selectedCategory: {},
  selectedIdx: null,
  clickedEntity: {
    selectedCategory: null,
    selectedEntity: null,
    selectedIdx: null,
    searchQuery: null,
  },
};

const home = createSlice({
  name: "home",
  initialState,
  reducers: {
    setInviteCode: (state, action) => {
      state.inviteCode = action.payload;
    },
    setEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },
    setDisplayAnnouncement: (state, action) => {
      state.displayAnnouncement = action.payload;
    },
    setSelectedEntity: (state, action) => {
      state.selectedEntity = action.payload || {};
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload || {};
    },
    setHoveredEntity: (state, action) => {
      const { category, entity, order } = action.payload;
      state.selectedCategory = category || {};
      state.selectedEntity = entity || {};
      state.selectedIdx = order;
    },
    setClickedEntity: (state, action) => {
      const { category, entity, order, searchQuery = null } = action.payload;
      state.clickedEntity.selectedCategory = category || {};
      state.clickedEntity.selectedEntity = entity || {};
      state.clickedEntity.selectedIdx = order;
      state.clickedEntity.searchQuery = searchQuery;
    },
  },
});

export const {
  setInviteCode,
  setEmailVerified,
  setDisplayAnnouncement,
  setSelectedEntity,
  setSelectedCategory,
  setHoveredEntity,
  setSelectedIndex,
  setClickedEntity,
} = home.actions;

export default home.reducer;
