import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout          from './components/Layout';
import ProtectedRoute  from './components/ProtectedRoute';
import ErrorBoundary   from './components/ErrorBoundary';

const Home           = lazy(() => import('./pages/Home'));
const Features       = lazy(() => import('./pages/Features'));
const Pricing        = lazy(() => import('./pages/Pricing'));
const Campaigns      = lazy(() => import('./pages/Campaigns'));
const CampaignDetail = lazy(() => import('./pages/CampaignDetail'));
const Login          = lazy(() => import('./pages/Login'));
const NotFound       = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'60vh'}}>
      <div className='spinner' />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index           element={<Home />} />
          <Route path='features' element={<Features />} />
          <Route path='pricing'  element={<Pricing />} />
          <Route path='login'    element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='campaigns' element={
              <ErrorBoundary><Campaigns /></ErrorBoundary>
            } />
            <Route path='campaigns/:id' element={
              <ErrorBoundary><CampaignDetail /></ErrorBoundary>
            } />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
