import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@admin/template/views/site/Home';
import About from '@admin/template/views/site/About';
import NotFound from '@admin/template/views/site/NotFound';
import DefaultLayout from '@admin/template/layouts/DefaultLayout';

const App = (): JSX.Element => {
  return (
    <Routes basename={process.env.BASE_URL}>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Navigate to="home" replace={true} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
