import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'use-http';

import Home from '@admin/views/site/Home';
import About from '@admin/views/site/About';
import NotFound from '@admin/views/site/NotFound';
import DefaultLayout from '@admin/layouts/DefaultLayout';

import BlankLayout from '@admin/layouts/BlankLayout';
import Login from '@admin/views/site/Login';

import useSplash from '@shared/hooks/useSplash';

import '@admin/assets/styles/admin.less';

import useError from '@shared/hooks/useError';

const UnauthorizedHttpCode = 401;
const UnprocessableEntityHttpCode = 422;

const HttpGetMethod = ['GET', 'HEAD'];

const App = () => {
  const { addError } = useError();

  useSplash();

  const handleError = (error) => {
    const historyBack = error.config.historyBack;

    console.log(error);

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
  };

  const options = {
    interceptors: {
      request: ({ options }) => {
        console.log(options);
        options.historyBack = options.historyBack || true;
        console.log(options);
        return options;
      },
      response: ({ response }) => {
        console.log(response);

        if (!response.ok) {
          return handleError(response.data);
        }

        return response;
      },
    },
    onError: ({ error }) => {
      console.log(error.status);
      handleError(error);
    },
  };

  return (
    <Provider url={document.querySelector('meta[name="api-host"]').getAttribute('content')} options={options}>
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
    </Provider>
  );
};

export default App;
