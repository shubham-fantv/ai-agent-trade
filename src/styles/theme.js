import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    custom: {
      white: "#fff",
      ebony: "#0C091B !important",
      seashell: "#3D3A49",
      buttonHover: "#fff",
      mirage: "#111329",
      headerCoin: "#fff",
      primaryHowItWork: "#0C091B",
      PrimaryBgColor: "#0C091B",
      PrimaryButtonBgColor: "#251D3E",
      PrimaryButtonBorderColor: "#251D3E",
      primaryWatchBg: "#181626",
      activeCategoryBg: "rgba(255, 255, 255, 0.1)",
      SongDescriptionBg: "#181626",
      fansRoyaltyBoxText: "rgba(255, 255, 255, 0.75)",
      borderColor: "#fff",
      returnCalculatorBg: "#242033",
      totalReturnBg: "#fff",
      collectorsIconsBorder: "#fff",
      fansRoyaltyShareSection: "#181626",
      leaderBoardHeaderBg: "#16132D",
      tabContainerNewButtonBg: "rgba(255, 255, 255, 0.1)",
      tabContainerNewButtonText: "#e8e2e5 !important",
      headerCoinBorder: "#fff",
      FanTigerWalletBorder: "rgba(237, 240, 255, 0.05)",
      sideBarBg: "#0C0A1D",
      videoUploadInputBg: "#211f37",
      videoUploadInputSelectColor: "#D8D8D8",
      currentBoxBg: "#16132d",
      currentRightBg: "#5D5E3D",
      howMuchCanEarn: "#222947",
      monthlyLimitPro: "#fff",
      earnCoinBg: "#0C091B",
      walletIconBg: "#2D293A",
      myContentBg: "#191E36",
      marketPlaceBuyBg: "#0c091b",
      marketPlaceBuyBorder: "#fff",
      marketPlaceBuyInput: "#2F2D3C",
      marketPlaceBuyInputBorder: "#3D3A51",
      privacyBg: "#fff",
      tradableContainerBg: "rgba(255, 255, 255, 0.1)",
      onBoardingBg: "#19132A",
      subscribeMobileBg: "#232133",
      descriptionColor: "rgb(204, 204, 204)",
      miniPlayerBottomContainerBg: "#0c091b",
      coinEarnProgressBg: "#222a49",
      graphLabelColor: "#000",
      activeCategorySecond: "rgba(255, 255, 255, 0.1)",
      editProfileBg: "#130e25",
      editProfileBgTop: "#282543",
      homePageMiniCard: "rgba(136, 136, 136, 1)",
      viewWatchPage: "#AFC3DB",
      signerName: "#fff",
      contrastText: "#000",
      couponCode: "#fff",
      couponCodeBg: "#482050",
      couponApply: "#0B091C",
      couponDescription: "#E14084",
      mainContainerBg: "#15132d",
      FanTigerWalletBorderWhite: "#fff",
      bankAccount: "#2D293A",
      returnCulculator: "rgba(48, 39, 72, 0.9)",
      graphContent: "rgba(255, 255, 255, 0.5)",
      investmentBox: "rgba(48, 39, 72, 0.9)",
      pink: "#E94278",
      withdrawalInput: "#757575",
      faqBtn: "#000",
      childContainer: "#fff",
      identity: "#424242",
      identityBg: "#fff",
      toClaimReward: "#C2C2C7",
      feedButton: "#C2C2C7",
      chartBackground: "#ffffff1a",
      categoryBg: "#FFF !important",
      activeNav: "#242232",
      sideNavBorder: "#423D5C",
    },
    background: {
      bannerGradient:
        "linear-gradient(269.1deg, rgb(12 10 29 / 0%) 9.11%, rgb(12 10 29 / 55%) 34.69%, #0c091b 58.04%)",
      bannerGradientBottom: "linear-gradient(180deg, rgba(12, 10, 29, 0) 0%, #0c091b 45.57%)",
      bannerGradientMobile:
        "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsl(0,0%,8%,.35) 29%,hsl(0,0%,8%,.58) 44%,#0b0819 68%,#0b0818)",
      slickNextBg: "linear-gradient(to right, rgb(0 0 0 / 0),rgb(0 0 0))",
      slickPrevBg: "linear-gradient(to left, rgb(0 0 0 / 0),rgb(0 0 0))",
      levelBg: "linear-gradient(transparent, rgb(22, 19, 45))",
      videoBg: "linear-gradient(270.38deg, #0c0a1d 11.53%, rgba(0, 0, 0, 0) 64.44%)",
      headerSectionLight: "linear-gradient(rgb(255 255 255 / 48%),rgb(12 9 27))",
      wonRewardBg: "linear-gradient(180deg, #222A49 0%, #191E36 100%);",
      mobileBg:
        "linear-gradient(0deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsl(0,0%,8%,.35) 29%,hsl(0,0%,8%,.58) 44%,#0b0819 68%,#0b0818)",
      commonButtonGradientBg:
        "linear-gradient(90.52deg, #E14084 4.01%, #3454FA 57.04%, #54B5BB 103.77%)",
      slickSliderLeft: "center/contain no-repeat url(/images/fantv/Profile/previous.png)",
      slickSliderright: "center/contain no-repeat url(/images/fantv/Profile/next.png)",
      dashboardBackground: "url('/images/fantv/Dashboardbg.png')",
    },
    boxShadow: {
      wonRewardBgShadow: "inset 0px 2px 4px #384056",
      buttonSell: "2px 1000px 1px #0c091b inset",
      faqButton: "2px 1000px 1px #fff inset",
      feedRewardButton: "1px 1000px 1px #181626 inset",
    },

    width: {
      darkWidthHomeBanner: "30%",
      darkWidthHomeBannerLeft: "25%",
    },
    left: {
      darkHomeBannerLeftSide: "20%",
    },
    borderBottom: {
      borderBottomBackground: "25px solid #181626",
      borderBottomDashboardBackground: "2px dashed #fff",
    },
    borderTop: {
      borderTopDashboardBackground: "1px solid #394573",
    },
    borderLeft: {
      borderLeftBackground: "1px solid #394573",
    },
    borderRight: {
      borderNav: "1px solid #423D5C",
    },
    typography: {
      fontFamily: ["Nohemi", "sans-serif"].join(","),
      font: {
        montserrat: {
          fontFamily: ["Nohemi", "sans-serif"].join(", "),
        },
        openSans: {
          fontFamily: ["Nohemi", "sans-serif"].join(", "),
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    custom: {
      white: "#171527",
      ebony: "#fff !important",
      seashell: "#F1F1F3",
      buttonHover: "#fff",
      mirage: "#fff",
      headerCoin: "#d8d8d8",
      primaryHowItWork: "#F1F1F3",
      PrimaryBgColor: "#f4f6fa",
      PrimaryButtonBgColor: "#f4f6fa",
      PrimaryButtonBorderColor: "#D0D2E1",
      primaryWatchBg: "#fff",
      activeCategoryBg: "#251D3E",
      SongDescriptionBg: "#f4f6fa",
      fansRoyaltyBoxText: "#5d5d5d",
      borderColor: "#000",
      returnCalculatorBg: "#fff",
      totalReturnBg: "#c8c8c8",
      collectorsIconsBorder: "#adadad",
      fansRoyaltyShareSection: "#f4f6fa",
      leaderBoardHeaderBg: "#f4f6fa",
      tabContainerNewButtonBg: "#cdcdcd",
      tabContainerNewButtonText: "#000",
      FanTigerWalletBorder: "#898890",
      sideBarBg: "#ffffff",
      videoUploadInputBg: "#c3c3c3",
      videoUploadInputSelectColor: "#171527",
      currentBoxBg: "#fff",
      currentRightBg: "#fff",
      howMuchCanEarn: "#fff",
      monthlyLimitPro: "#5b596c",
      earnCoinBg: "#fff",
      walletIconBg: "#f4f6fa",
      myContentBg: "#fff",
      marketPlaceBuyBg: "#f4f6fa",
      marketPlaceBuyBorder: "#898890",
      marketPlaceBuyInput: "#c3c3c3",
      marketPlaceBuyInputBorder: "#c3c3c3",
      privacyBg: "#f4f6fa",
      tradableContainerBg: "#f4f6fa",
      onBoardingBg: "#fff",
      subscribeMobileBg: "#f4f6fa",
      descriptionColor: "#171527",
      miniPlayerBottomContainerBg: "#fff",
      coinEarnProgressBg: "#fff",
      graphLabelColor: "#fff",
      activeCategorySecond: "#888888",
      editProfileBg: "#fff",
      editProfileBgTop: "#f4f6fa",
      homePageMiniCard: "#000",
      viewWatchPage: "#171527",
      signerName: "#fff",
      contrastText: "#000",
      couponCode: "#fff",
      couponCodeBg: "#482050",
      couponApply: "#0B091C",
      couponDescription: "#E14084",
      mainContainerBg: "#f4f6fa",
      FanTigerWalletBorderWhite: "#898890",
      bankAccount: "#fff",
      returnCulculator: "#f4f6fa",
      graphContent: "#000",
      investmentBox: "rgb(244 246 250)",
      pink: "#E94278",
      withdrawalInput: "#757575",
      faqBtn: "#fff",
      childContainer: "#838384",
      identity: "#fff",
      identityBg: "#303030",
      toClaimReward: "#000",
      feedButton: "#0C091B",
      chartBackground: "#F3F3F4",
      categoryBg: "#E94278 !important",
      activeNav: "#e5e5e5",
      sideNavBorder: "#ebeaf1",
    },
    background: {
      bannerGradient: "linear-gradient(90deg, rgb(244 246 250) 42%, rgba(255, 255, 255, 0) 100%)",
      bannerGradientBottom: "linear-gradient(180deg, rgba(12, 10, 29, 0) 0%, #f4f6fa 45.57%)",
      bannerGradientMobile:
        "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsl(0deg 0% 96.85% / 15%) 15%,hsl(0deg 0% 86.54% / 35%) 29%,hsl(0deg 0% 87.69% / 74%) 44%,#f4f6fa 68%,#f4f6fa)",
      slickNextBg: "linear-gradient(to right, rgb(255 255 255 / 0%),rgb(255 255 255))",
      slickPrevBg: "linear-gradient(to left, rgb(255 255 255 / 0%),rgb(244 246 250))",
      levelBg: "linear-gradient(transparent,#f4f6fa)",
      videoBg: "linear-gradient(270.38deg, #f4f6fa 11.53%, rgba(0, 0, 0, 0) 64.44%)",
      headerSectionLight: "linear-gradient(rgb(255 255 255 / 48%),rgb(244 244 244))",
      wonRewardBg: "linear-gradient(180deg, #ffffff 0%, #ffffff 100%)",
      mobileBg:
        "linear-gradient(0deg,hsla(0,0%,8%,0) 0,hsl(0deg 0% 100% / 15%) 15%,hsl(0deg 0% 91.6% / 35%) 29%,hsl(0deg 0% 100% / 58%) 44%,#f4f6fa 68%,#f4f6fa)",
      commonButtonGradientBg:
        "linear-gradient(90.52deg, #E14084 4.01%, #3454FA 57.04%, #54B5BB 103.77%)",
      slickSliderLeft: "center/contain no-repeat url(/images/fantv/Profile/previous2.png)",
      slickSliderright: "center/contain no-repeat url(/images/fantv/Profile/next2.png)",
      dashboardBackground: "url('/images/fantv/dashboardWhiteBackground.png')",
    },
    boxShadow: {
      wonRewardBgShadow: "0px 1px 1px 0px #c3c3c3",
      buttonSell: "2px 1000px 1px #ffffff inset",
      faqButton: "2px 1000px 1px #000 inset",
      feedRewardButton: "1px 1000px 1px #fff inset",
    },
    borderBottom: {
      borderBottomBackground: "25px solid #fff",
      borderBottomDashboardBackground: "2px dashed #0b091c80",
    },
    borderLeft: {
      borderLeftBackground: "1px solid #D1DAFF",
    },
    borderRight: {
      borderNav: "1px solid #ebeaf1",
    },
    borderTop: {
      borderTopDashboardBackground: "1px solid #D1DAFF",
    },

    width: {
      darkWidthHomeBanner: "12%",
      darkWidthHomeBannerLeft: "14%",
    },
    left: {
      darkHomeBannerLeftSide: "26%",
    },
  },
  typography: {
    fontFamily: ["Nohemi", "sans-serif"].join(","),
    font: {
      montserrat: {
        fontFamily: ["Nohemi", "sans-serif"].join(", "),
      },
      openSans: {
        fontFamily: ["Nohemi", "sans-serif"].join(", "),
      },
    },
  },
});

let theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      xm: 375,
      mobile: 480,
      tablet: 768,
      laptop: 1024,
      lg: 1200,
      xl: 1440,
      xxl: 1920,
    },
  },
  // typography: {
  //   fontFamily: ["Inter", "sans-serif"].join(","),
  //   font: {
  //     montserrat: {
  //       fontFamily: ["Montserrat", "sans-serif"].join(", "),
  //     },
  //     openSans: {
  //       fontFamily: ["Open Sans", "sans-serif"].join(", "),
  //     },
  //   },
  // },
  typography: {
    fontFamily: ["Nohemi"].join(","),
    font: {
      Nohemi: {
        fontFamily: ["Nohemi", "Nohemi"].join(", "),
      },
    },
    allVariants: {
      fontFamily: "Nohemi",
    },
  },
});

const customTypography = {
  primaryBackground: {
    background:
      "linear-gradient(90.48deg, rgba(225, 64, 132, 0.1) 3.73%, rgba(52, 84, 250, 0.1) 53.09%, rgba(84, 181, 187, 0.1) 96.58%)",
    filter: "blur(234px)",
  },
  primaryBtn: {
    background: "linear-gradient(90.48deg, #E14084 3.73%, #3454FA 53.09%, #54B5BB 96.58%)",
  },
  disabledBtn: {
    background: "linear-gradient(90.52deg, #C4C4C4 4.01%, #C4C4C4 57.04%, #B0B0B0 103.77%)",
  },
  h1: {
    fontSize: "42px",
    fontWeight: 700,
    lineHeight: "54px",
  },
  h2: { fontSize: "36px", fontWeight: 700, lineHeight: "42px" },
  h3: { fontSize: "24px", fontWeight: 600, lineHeight: "32px" },
  h4: { fontSize: "20px", fontWeight: 400, lineHeight: "28px" },
};

theme = {
  ...theme,
  typography: {
    ...theme.typography,
    ...customTypography,
  },
};

export default theme;

export { lightTheme, darkTheme };
