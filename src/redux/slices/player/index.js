import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerPlayer: { id: "" },
  fanTvPlayer: {
    control: {},
    isMiniPlayer: false,
    videoDetails: { watchId: "", videoId: "" },
    playerProps: {},
    playNext: false,
    currentTime: 0,
    playlists: [],
  },
  appMiniPlayer: { status: false, currentTime: 0, id: "" },
};

const player = createSlice({
  name: "player",
  initialState,
  reducers: {
    setBannerPlayer: (state, action) => {
      state.bannerPlayer.id = action.payload;
    },
    setMiniPlayer: (state, action) => {
      state.fanTvPlayer.isMiniPlayer = action.payload;
    },
    setVideoDetails: (state, action) => {
      state.fanTvPlayer.videoDetails = action.payload;
    },
    setPlayNext: (state, action) => {
      state.fanTvPlayer.playNext = action.payload;
    },
    setPlayerProps: (state, action) => {
      state.fanTvPlayer.playerProps = action.payload;
    },
    setPlayerCurrentTime: (state, action) => {
      state.fanTvPlayer.currentTime = action.payload;
    },
    setAppMiniPlayerCurrentTime: (state, action) => {
      state.appMiniPlayer.currentTime = action.payload;
    },
    setAppMiniPlayerStatus: (state, action) => {
      state.appMiniPlayer.status = action.payload;
    },
    setAppMiniPlayerId: (state, action) => {
      state.appMiniPlayer.id = action.payload;
    },
    setPlaylists: (state, action) => {
      state.fanTvPlayer.playlists = action.payload;
    },
  },
});

export const {
  setBannerPlayer,
  setMiniPlayer,
  setVideoDetails,
  setPlayNext,
  setPlayerProps,
  setAppMiniPlayerStatus,
  setPlayerCurrentTime,
  setAppMiniPlayerCurrentTime,
  setAppMiniPlayerId,
  setPlaylists,
} = player.actions;

export default player.reducer;
