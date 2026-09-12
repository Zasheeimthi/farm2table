import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App.jsx';
import './styles.css';
import './marketplace.css';
import './refinements.css';

const theme = {
  token: {
    colorPrimary: '#FE5D02',
    colorSuccess: '#103B37',
    colorWarning: '#FE5D02',
    colorText: '#121212',
    colorTextSecondary: '#526762',
    colorBgBase: '#F8F3EC',
    colorBgContainer: '#FFFFFF',
    colorBorder: '#103B37',
    borderRadius: 4,
    fontFamily: 'Montserrat, Arial, sans-serif',
    controlHeight: 48
  },
  components: {
    Button: {
      borderRadius: 0,
      controlHeight: 48,
      fontWeight: 700,
      primaryShadow: 'none'
    },
    Card: {
      borderRadiusLG: 8,
      paddingLG: 22
    },
    Input: {
      borderRadius: 2,
      controlHeight: 50
    },
    Drawer: {
      colorBgElevated: '#F8F3EC'
    }
  }
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
