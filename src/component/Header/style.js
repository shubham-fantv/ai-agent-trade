const styles = {
  navbar: {
    height: '92px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    position: 'absolute',
    top: '0',
    zIndex: '99',
    padding: '0 15px',
    width: '100%',

    '@media (max-width:767px)': {
      height: '55px',
      position: 'absolute',
      top: '0',
      zIndex: '999',
      width: '100%',
      padding: '0px',
    },
    '& .nav-container': {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      fontWeight: '400',
      width: '100%',
      // height: "75px",
      maxWidth: '1296px',
      '@media (max-width:1024px)': {
        width: '100%',
        maxWidth: '100%',
      },
      '@media (max-width:767px)': {
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginInline: '15px',
      },
      '& .nav-logo': {
        alignItems: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        marginRight: '80px',

        '@media (max-width:767px)': {
          position: 'relative',
          marginRight: '10px',
        },

        '& .fan__tigerDekstopLogo': {
          ' & img': {
            width: '140px',
            display: 'block',
          },

          '@media (max-width:767px)': {
            display: 'none',
          },
        },
        '& .fan__TigerMobileLogo': {
          ' & img': {
            // maxWidth: "130px",
          },
        },
      },
      '& .nav-menu': {
        display: 'flex',
        cursor: 'pointer',
        paddingLeft: '20px',
        paddingRight: '40px',
        alignItems: 'center',

        '@media (max-width:767px)': {
          height: '100vh',
          alignItems: 'unset',
          paddingRight: '10px',
          fontSize: '20px',
          marginRight: '0',
        },
        '@media (max-width:1900px)': {
          fontSize: '16px',
          // marginRight: '40px',
        },
        '& .nav-item': {
          marginRight: '28px',
          fontWeight: '500',
          listStyle: 'none',
          display: 'flex',
          color: 'custom.white',
          '&:hover': {
            color: '#E14084',
          },

          '@media (max-width:1368px)': {
            fontSize: '16px',
            marginRight: '10px',
          },
          '@media (max-width:1200px)': {
            fontSize: '14px',
            marginRight: '10px',
          },
          '@media (max-width:1199px)': {
            fontSize: '14px',
            marginRight: '10px',
            fontWeight: '400',
          },
        },
      },
      '@media (max-width: 960px)': {
        '& .active': {
          backgroundColor: 'red',
          height: '100vh',
          width: '100vw',
        },
      },
    },
  },

  meneDownloadButtonWrapper: {
    cursor: 'pointer',
    fontFamily: 'Nohemi',
    borderRadius: '60px',
    // background: "#FFF",
    padding: '8px 16px',
    alignSelf: 'center',
    display: 'flex',
    color: '#0C091B',
    gap: '5px',
    fontSize: '16px',

    '& p': {
      fontFamily: 'Nohemi !important',
      fontWeight: '800',
    },
    '@media(max-width:767px)': {
      padding: '5px 15px',
      fontSize: '16px',
      fontStyle: 'normal',
      '& p': {
        fontFamily: 'Nohemi Black',
        fontSize: '16px',
        fontStyle: 'normal',
        // fontWeight: "500",
      },
    },
  },
  meneButtonWrapper: {
    cursor: 'pointer',
    color: '#fff',
    fontFamily: 'Nohemi !important',
    borderRadius: '60px',
    background: '#242232',
    fontWeight: '600',
    padding: '8px 16px',
    alignSelf: 'center',
    fontSize: '16px',
    '& p': {
      color: '#fff',
      fontWeight: '600',
    },
    '&:hover': {
      border: 'none',
      background: '#7E7DFC',
      color: '#FFFFFF',
      mixBlendMode: 'plus-lighter',
    },
    '& .activeMenu': {
      border: 'none',
      background: '#7E7DFC',
      color: '#FFFFFF',
      mixBlendMode: 'plus-lighter',
    },
  },

  liveSection: {
    '@media (max-width:480px)': {
      display: 'none !important',
    },
  },
  account__Wallet: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    display: 'flex',
    minWidth: 'max-content',

    '& .Wallet__Details': {
      padding: '1px 7px',
      cursor: 'pointer',
      '& span': {
        marginLeft: '8px',
        '@media (max-width:480px)': {
          fontSize: '12px',
          marginLeft: '5px',
        },
      },

      '@media (max-width:480px)': {
        padding: '2px 7px',
      },
    },
    '& .user': {
      height: '24px',
      cursor: 'pointer',
      '@media (max-width:767px)': {
        display: 'none',
      },
      '& img': {
        mixBlendMode: 'exclusion',
      },
    },
  },

  user__CoinFull: {
    position: 'relative',
    display: 'flex',
    backgroundColor: 'custom.headerCoin',
    borderRadius: '100px',
    fontSize: '14px !important',
    fontWeight: '400',
    padding: '0px 6px 0 0px',
    color: '#000',
    alignItems: 'center',
    cursor: 'pointer',
    '@media (max-width:1200px)': {
      fontSize: '14px !important',
    },
    '& span': {
      marginLeft: '8px',
      '@media (max-width:480px)': {
        fontSize: '12px',
        marginLeft: '5px',
      },
    },
    '& img': {
      mixBlendMode: 'unset !important',
    },
  },

  loginWithGif: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px !important',
    fontWeight: '600',
    color: 'custom.white',

    '@media(max-width:480px)': {
      padding: '5px 10px 5px 10px',
      width: 'auto',
      marginRight: '0px',
      fontSize: '14px !important',
    },
  },

  INRdropdownContainerMobileView: {
    maxWidth: '100%',
    marginLeft: '20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: '15px',
    '& span': {
      marginRight: '10px',
    },
    '@media(max-width:480px)': {
      marginLeft: '0px',
      marginBottom: '15px',
    },
  },
  mobileINR: {
    marginRight: '-75px',
    '& button': {
      backgroundColor: '#19132b',
      border: 'none',
      padding: '7px 15px',
      borderRadius: '100px',
      fontSize: '14px',
      fontWeight: '600 !important',
      color: '#0C091B',
      border: 'solid',
      borderColor: 'custom.headerCoin',
      borderWidth: '0',
      cursor: 'pointer',
      color: '#fff',
      marginLeft: '-1px',
      '@media(max-width:480px)': {
        padding: '4px 10px',
        fontSize: '12px',
      },
    },
    '& .activeBtn': {
      color: '#000',
      backgroundColor: 'custom.headerCoin',
    },
    '@media(max-width:480px)': {
      marginRight: '0',
    },
  },

  mobileINR2: {
    marginRight: '-75px',
    '& button': {
      backgroundColor: '#19132b',
      border: 'none',
      padding: '5px 15px',
      borderRadius: '100px',
      fontSize: '14px',
      fontWeight: '500 !important',
      color: '#0C091B',
      border: 'solid',
      borderColor: 'custom.headerCoin',
      borderWidth: '0',
      cursor: 'pointer',
      color: '#fff',
      marginLeft: '-1px',
      transition:
        'background-color .2s ease-in-out,box-shadow .2s ease-in-out,border-color .2s ease-in-out,color .2s ease-in-out',
      '@media(max-width:480px)': {
        padding: '3px 7px',
        fontSize: '12px',
      },
    },
    '& .activeBtn': {
      color: '#000',
      backgroundColor: 'custom.headerCoin',
    },
    '@media(max-width:480px)': {
      marginRight: '0',
    },
  },

  INRdropdownContainer: {
    maxWidth: '120px',
    '& .MuiMenu-list': {
      padding: '0 !important',
    },

    '@media(max-width:480px)': {
      maxWidth: '120px',
      marginLeft: '20px',
    },
    '@media(max-width:1900px)': {
      textAlign: 'center',
      display: 'flex',
    },
  },

  NavIcon: {
    display: 'flex',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: '#fff',
    alignItems: 'center',
    '& img': {
      mixBlendMode: 'exclusion',
    },
  },
  closeNav: {
    display: 'flex',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: '#fff',
    marginTop: '10px',
    position: 'fixed',
    right: '15px',
    top: '10px',
    zIndex: '9',
    mixBlendMode: 'exclusion',
  },

  name: {
    fontSize: '16px',
    fontWeight: '500',
    color: 'custom.white',
  },
  email: {
    fontSize: '12px',
    fontWeight: '400',
    marginBottom: '10px',
    color: 'custom.white',
  },
  buttonSection: {
    display: 'flex',
    alignItems: 'end',
    height: '100px',
    '& button': {
      background: '#fff',
      borderRadius: '100px',
      padding: '9px 0px',
      color: '#16132D',
      fontWeight: '700 !important',
    },
  },
  profileNavBar: {
    display: 'flex',
    // columnGap: '15px',
    // paddingTop: '28px',
  },

  mobileProfileWallet: {},
  lightDark: {
    display: 'flex',
    cursor: 'pointer',
    animation: 'fadeIn 5s',
    alignItems: 'center',
    '& img': {
      width: '25px',
      height: '25px',
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: '0',
      },
      '100%': {
        opacity: '1',
      },
    },
    '@media(max-width:480px)': {
      display: 'none',
    },
  },

  lightDarkDesktop: {
    '& button': {
      backgroundColor: 'custom.white',
      fontSize: '13px',
      gap: '6px',
      borderRadius: '100px',
      color: 'custom.ebony',
      padding: '5px 23px',
      height: '30px',
      width: '110px',
      '& svg': {
        color: 'custom.ebony',
        fontSize: '18px',
      },
      '&:hover': {
        backgroundColor: 'custom.white',
      },
      '@media(max-width:480px)': {
        fontSize: '11px',
        width: '90px',
      },
    },
  },

  lightDarkMobile: {
    '@media(max-width:480px)': {
      display: 'flex',
      '& img': {
        width: '20px',
        height: '20px',
      },
    },
  },
  mobileScroll: {
    height: '55vh',
    overflowY: 'auto',
    width: '100%',
    // padding: '9px 21px 25px 0px',
  },
  loginBottomOnlyMobile: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: '75px',
    '@media(max-width:480px)': {
      gap: '20px',
    },
    '@media(max-width:320px)': {
      gap: '0px',
    },
  },
  appButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      background: '#FFF',
      borderRadius: '100px',
      padding: '6px 10px',
      display: 'flex',
      alignItems: 'center',
      color: '#424242',
      fontSize: '16px',
      fontWeight: '500',
      textTransform: 'none',
      gap: '10px',
      '& span': {
        display: 'flex',
        alignItems: 'center',
        '& img': {
          width: '24px',
          '@media(max-width:767px)': {
            width: '16px',
          },
        },
      },
      '&:hover': {
        background: '#FFF',
      },
    },
    '@media(max-width:767px)': {
      marginLeft: '5px',
      '& button': {
        background: '#e7e7e7',
        height: '30px',
        fontSize: '10px',
        gap: '5px',
        '&:hover': {
          background: '#e7e7e7',
        },
      },
    },
  },

  btnContainer: {
    boxShadow: '0px 6px 12px 0px #1E1E1E1F',
    border: '1px solid #FFF',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.16) 100%)',
    borderRadius: '12px',
    padding: '0px',
    alignItems: 'center',
    height: '40px',
    textTransform: 'none',
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: '#FFF',
    '& button': {
      color: '#1E1E1E',
      fontWeight: '600',
      fontSize: '14px',
      textTransform: 'none',
      height: '100%',
      fontFamily: 'Nohemi',
      lineHeight: '21px',
      paddingRight: '10px',
      paddingLeft: '6px',
    },
    '& img': {
      height: '20px',
      width: '20px',
      marginLeft: '10px',
    },
    '&:hover': {
      backgroundColor: '#FFF',
    },
    '@media(max-width:767px)': {
      '& button': {
        fontSize: '12px',
      },
    },
  },

  pointContainer: {
    boxShadow: '0px 6px 12px 0px #1E1E1E1F',
    border: '1px solid #FFF',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.16) 100%)',
    borderRadius: '40px',
    paddingLeft: '10px',
    paddingRight: '20px',
    alignItems: 'center',
    height: '40px',
    textTransform: 'none',
    display: 'flex',
    '& button': {
      color: '#1E1E1E',
      fontWeight: '600',
      fontSize: '14px',
      textTransform: 'none',
      height: '100%',
      fontFamily: 'Nohemi',
      lineHeight: '21px',
      paddingRight: '20px',
      paddingLeft: '6px',
    },
    '& img': {
      height: '32px',
      width: '32px',
    },
  },

  appleBtnContainer: {
    boxShadow: '0px 4px 6px 0px #00000026',
    border: '1px solid #FFF',
    borderRadius: '100px',
    height: '44px',
    width: '44px',
    background: '#FFF',
    '& img': {
      padding: '10px',
    },
  },
  androidBtnContainer: {
    boxShadow: '0px 4px 6px 0px #00000026',
    borderRadius: '100px',
    height: '44px',
    width: '44px',
    background: '#000',
    '& img': {
      padding: '10px',
    },
  },
};

export default styles;
