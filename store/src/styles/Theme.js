import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#545454',
    primaryLight: '#969696',
    secondary: '#545454',
    success: '#2AB516',
    danger: '#F83434',
    dark: '#21252A',
    gray: '#545454',
    grayLight: '#E4E4E4',
    white: '#fff',
  },
  fonts: ['Roboto', 'sans-serif'],
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
