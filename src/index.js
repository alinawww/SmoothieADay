import React from 'react';
import ReactDOM from 'react-dom';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import App from './App';
import './index.css';

ReactDOM.render(
    <App source="https://api.edamam.com/search?q=smoothie&from=0&to=30" />,
    document.getElementById('root')
);
