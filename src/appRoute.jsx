import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from './components/search';
import Header from './components/header';
import NotFound from './components/notFound';

export default function AppRoute() {
  return (
    <Router>
        <Header/>
        <Routes>
            <Route path='/' element={<Search/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </Router>
  )
}
