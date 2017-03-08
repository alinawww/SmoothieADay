import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App source="https://api.edamam.com/search?q=smoothie&from=0&to=30" />,
  document.getElementById('root')
);
