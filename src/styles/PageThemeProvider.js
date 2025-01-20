import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './theme';
import { setTheme } from '../redux/slices/layout';

const PageThemeProvider = ({ app, children }) => {
  const { theme } = app || {};
  const [themeMode, setThemeMode] = useState(theme);

  const { theme: appTheme } = useSelector((state) => state.layout);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!!appTheme) {
      // setThemeMode(appTheme);
      setThemeMode('dark');
    }
  }, [appTheme]);

  useEffect(() => {
    if (theme) {
      // dispatch(setTheme(theme));
      dispatch(setTheme('dark'));
    }
  }, []);

  const themeConfig = themeMode === 'light' ? lightTheme : darkTheme;

  return <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>;
};

export default PageThemeProvider;
