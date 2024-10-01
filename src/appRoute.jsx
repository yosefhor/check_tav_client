import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from './components/search';
import Header from './components/header';
import Info from './components/info';
import FAQ from './components/faq';
import Footer from './components/footer';
import NotFound from './components/notFound';

export default function AppRoute() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/info' element={<Info />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}
