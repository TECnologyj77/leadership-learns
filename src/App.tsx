import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import Corporate from './pages/Corporate';
import Individual from './pages/Individual';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import HomeStructuredData from './seo/HomeStructuredData';
import RouteMetadata from './seo/RouteMetadata';
import { routeMetadata } from './seo/metadataCatalog';

const App: React.FC = () => {
  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <RouteMetadata metadata={routeMetadata.home} />
              <HomeStructuredData />
              <Home />
            </>
          )}
        />
        <Route
          path="/corporate"
          element={(
            <>
              <RouteMetadata metadata={routeMetadata.corporate} />
              <Corporate />
            </>
          )}
        />
        <Route
          path="/individual"
          element={(
            <>
              <RouteMetadata metadata={routeMetadata.individual} />
              <Individual />
            </>
          )}
        />
        <Route
          path="/about"
          element={(
            <>
              <RouteMetadata metadata={routeMetadata.about} />
              <About />
            </>
          )}
        />
        <Route
          path="/blog"
          element={(
            <>
              <RouteMetadata metadata={routeMetadata.blog} />
              <Blog />
            </>
          )}
        />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route
          path="/contact"
          element={(
            <>
              <RouteMetadata metadata={routeMetadata.contact} />
              <Contact />
            </>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageLayout>
  );
};

export default App;
