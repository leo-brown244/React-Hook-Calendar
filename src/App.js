import React from 'react';
import logo from './logo.svg';
import Calendar from './component/calendar'
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 2000,
  position: positions.BOTTOM_CENTER
};

function App() {
  return (
    <Provider template={AlertTemplate} {...options}>
      <Calendar />
    </Provider>
  );
}

export default App;
