import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login';
import BookingList from './components/Booking/BookingList';
import 'primeflex/primeflex.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route element={<ProtectedRoute/>} path="bookings" >
          <Route path="list" element={<BookingList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
