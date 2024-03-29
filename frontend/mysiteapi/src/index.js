import React from "react";
import ReactDOM from 'react-dom/client';
// import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register'
import { StrictMode } from "react";
import Login from './components/Login';
import Logout from './components/Logout';
import Single from './components/Single';
import SearchResult from './components/SearchResult';
import Admin from './Admin';
import Create from './components/admin/create';
import Edit from './components/admin/edit';
import Delete from './components/admin/delete';

const routing = (
    <BrowserRouter>
        <StrictMode>
            <Header />
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/admin" element={<Admin />} />
                <Route exact path="/admin/create" element={<Create />} />
                <Route exact path="/admin/edit/:id" element={<Edit />} />
                <Route exact path="/admin/delete/:id" element={<Delete />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/post/:slug" element={<Single />} />
                <Route path="/search" element={<SearchResult />} />
            </Routes>
            <Footer />
        </StrictMode>
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
