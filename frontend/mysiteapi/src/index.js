import React from "react";
import ReactDOM from 'react-dom/client';
// import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';

const routing = (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route exact path="/" element={<App />} />
        </Routes>
        <Footer />
    </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(routing);





















// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();