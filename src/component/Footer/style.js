const styles = {
  footerContainer: {
    position: "relative",
    width: "100%",
    background: "#1E1E1E",
    color: "custom.white",
  },
  linebreak: {
    width: "100%",
    height: "5px",
  },
  fantigerFooter: {
    // backgroundColor: "custom.earnCoinBg",
    // padding: "30px 0",
  },

  fanTiger__footerCopyright: {
    display: "flex",
    color: "custom.white",
    justifyContent: "center",
    marginTop: "25px",
    "@media (max-width:767px)": {
      flexDirection: "column",
      fontSize: "11px",
      textAlign: "center",
    },
  },
  sidebar: {
    backgroundColor: "custom.sideBarBg",
    display: "none",
    width: "140px",
    flexDirection: "column",
    flex: "0 0 140px",
    height: "auto",
    "@media(max-width:668px)": {
      display: "block",
      position: "fixed",
      bottom: "0",
      width: "100%",
      zIndex: "999",
      left: "0",
      right: "0",
    },
  },
  sidebarNav: {
    "& ul": {
      margin: "0",
      padding: "0",
      "@media(max-width:668px)": {
        display: "flex",
      },
      "& li": {
        display: "block",
        fontWeight: "600",
        fontSize: "15px",
        color: "custom.white",
        textAlign: "center",
        padding: "13px",
        cursor: "pointer",

        "& span": {
          // border: "1px solid #888BA8",
          // borderRadius: "100px",
          // width: "55px",
          // height: "55px",
          display: "flex",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          // marginBottom: "10px",
          paddingBottom: "3px",
          "& img": {
            width: "20px",
            height: "20px",
          },
        },
        "@media(max-width:668px)": {
          width: "100%",
          padding: "8px 0",
          fontSize: "12px",
          fontWeight: "600",
          "&:nth-child(5)": {
            display: "none",
          },
          "&:nth-child(6)": {
            display: "none",
          },

          "& img": {
            width: "20px",
            marginRight: "0",
          },
        },
      },
    },
    "& .activeNav": {
      backgroundColor: "custom.earnCoinBg",
      color: "#E14084",
    },
  },
};

export default styles;
