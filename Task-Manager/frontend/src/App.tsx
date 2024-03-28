import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Router from './components/Router';

const Layout = React.lazy(() => import('./components/Layout'));
const Render = React.lazy(() => import('./components/Render'));
const Signin = React.lazy(() => import('./pages/Signin'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Home = React.lazy(() => import('./pages/Home'));
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Render />}>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
          <Route path="/*" element={<WithLayout />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const WithLayout = () => (
  <Layout>
    <Router />
  </Layout>
);

export default App;
