// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// You'll need to create a global CSS file, e.g., index.css or App.css,
// and import it here if you haven't already set up Tailwind.
// For Tailwind, ensure your tailwind.config.js is set up and your main CSS file
// (often index.css or app.css) includes Tailwind directives:
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
import './index.css'; // Or your main Tailwind CSS file

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
