import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import History from './pages/History';
import Personalities from './pages/Personalities';
import Library from './pages/Library';
import Contacts from './pages/Contacts';
import Gallery from './pages/Gallery';
import PersonDetails from './components/PersonDetails';
import AdminPanel from './components/AdminPanel';
import SharedLayout from './components/SharedLayout';
import LoginPage from './pages/LoginPage';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <div className="font-sans">
      <Router basename="/">
        <Routes>

          {/* Українська версія сайту */}
          <Route path="/uk" element={<SharedLayout language="uk" />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="history" element={<History />} />
            <Route path="personalities" element={<Personalities />} />
            <Route path="personalities/:id" element={<PersonDetails />} />
            <Route path="library" element={<Library />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="gallery" element={<Gallery />} />

          </Route>

          {/* Англійська версія сайту */}
          <Route path="/en" element={<SharedLayout language="en" />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="history" element={<History />} />
            <Route path="personalities" element={<Personalities />} />
            <Route path="personalities/:id" element={<PersonDetails />} />
            <Route path="library" element={<Library />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="gallery" element={<Gallery />} />

          </Route>

          <Route path="/" element={<Navigate to="/uk" replace />} />

          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="login" element={<LoginPage />} />


        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
