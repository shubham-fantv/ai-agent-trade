import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: false,
  country_code: "IN",
  theme: "dark",
  coinEarnAnimation: false,
  eventId: null,
  ticketCountNo: null,
  ticketPriceInfo: [],
  userTicketInfo: [],
  ticketQuestionnaire: {},
  selectedTicketCategoryID: null,
  airdropPoints: 0,
  isSignWalletPopupOpen: false,
};

const layout = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setTest: (state) => {
      state.test = true;
    },
    setCountryCode: (state, action) => {
      state.country_code = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setCoinEarnAnimate: (state, action) => {
      state.coinEarnAnimation = action.payload;
    },
    setEventId: (state, action) => {
      state.eventId = action.payload;
    },
    setTicketCountNo: (state, action) => {
      state.ticketCountNo = action.payload;
    },
    setTicketPriceInfo: (state, action) => {
      state.ticketPriceInfo = action.payload;
    },
    setUserTicketInfo: (state, action) => {
      state.userTicketInfo = action.payload;
    },
    setTicketQuestionnaire: (state, action) => {
      state.ticketQuestionnaire = action.payload;
    },
    setSelectedTicketCategoryID: (state, action) => {
      state.selectedTicketCategoryID = action.payload;
    },
    setWalletAirdropPoints: (state, action) => {
      state.airdropPoints = action.payload;
    },
    setSignWalletPopupOpen: (state, action) => {
      state.isSignWalletPopupOpen = action.payload;
    },
  },
});

export const {
  setTest,
  setCountryCode,
  setCoinEarnAnimate,
  setTheme,
  setEventId,
  setTicketCountNo,
  setTicketPriceInfo,
  setUserTicketInfo,
  setTicketQuestionnaire,
  setSelectedTicketCategoryID,
  setWalletAirdropPoints,
  setSignWalletPopupOpen,
} = layout.actions;

export default layout.reducer;
