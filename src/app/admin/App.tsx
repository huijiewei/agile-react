import { FC } from 'react';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Home from '@admin/views/site/Home';
import About from '@admin/views/site/About';
import NotFound from '@admin/views/site/NotFound';
import DefaultLayout from '@admin/layouts/DefaultLayout';

import './App.less';
import useSplash from '@shared/hooks/useSplash';

const App: FC = () => {
  useSplash();

  return (
    <Router>
      <Routes basename={process.env.BASE_URL}>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<Navigate to="home" replace={true} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
