import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import RouteSeo from './components/seo/RouteSeo';
import Home from './pages/Home';
import Corporate from './pages/Corporate';
import Individual from './pages/Individual';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <PageLayout>
      <RouteSeo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageLayout>
  );
};

export default App;
