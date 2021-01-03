import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Home from '@admin/views/site/Home';
import About from '@admin/views/site/About';
import NotFound from '@admin/views/site/NotFound';
import DefaultLayout from '@admin/layouts/DefaultLayout';

import BlankLayout from '@admin/layouts/BlankLayout';
import Login from '@admin/views/site/Login';

import useSplash from '@shared/hooks/useSplash';
import ErrorProvider from '@shared/providers/ErrorProvider';
import ErrorDialog from '@admin/components/ErrorDialog';

import '@admin/assets/styles/admin.less';

const App = () => {
  useSplash();

  return (
    <ErrorProvider>
      <Router>
        <Routes basename={process.env.PUBLIC_URL}>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Navigate to="home" replace={true} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<BlankLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
      <ErrorDialog />
    </ErrorProvider>
  );
};

export default App;
