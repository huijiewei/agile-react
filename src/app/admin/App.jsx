import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { SWRConfig } from 'swr';

import Home from '@admin/views/site/Home';
import About from '@admin/views/site/About';
import NotFound from '@admin/views/site/NotFound';
import DefaultLayout from '@admin/layouts/DefaultLayout';

import BlankLayout from '@admin/layouts/BlankLayout';
import Login from '@admin/views/site/Login';

import useSplash from '@shared/hooks/useSplash';

import '@admin/assets/styles/admin.less';

import useError from '@shared/hooks/useError';
import axios from 'axios';

const UnauthorizedHttpCode = 401;
const UnprocessableEntityHttpCode = 422;

const HttpGetMethod = ['GET', 'HEAD'];

const App = () => {
  const { addError } = useError();

  useSplash();

  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          const historyBack = error.config.historyBack;

          if (!error.response) {
            addError(error.message, historyBack);

            return;
          }

          if (error.response.status === UnauthorizedHttpCode) {
            if (!error.config.__storeDispatch) {
              error.config.__storeDispatch = true;

              if (historyBack || HttpGetMethod.includes(error.config.method.toUpperCase())) {
                // 跳转登录
              } else {
                // 窗口登录
              }
            }

            return;
          }

          if (error.response.status === UnprocessableEntityHttpCode) {
            return;
          }

          addError(
            error.response.data.detail ||
              error.response.data.message ||
              error.response.data.title ||
              error.response.statusText ||
              '网络请求错误',
            historyBack,
          );
        },
        fetcher: (url) => {
          return axios({
            baseURL: document.querySelector('meta[name="api-host"]').getAttribute('content'),
            url: url,
          }).then((res) => res.data);
        },
      }}
    >
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
    </SWRConfig>
  );
};

export default App;
