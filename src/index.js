import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Container } from "react-reflex-grid";

ReactDOM.render(
  <React.StrictMode>
    <Container full>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);