import { Suspense, lazy } from 'react';
import { useRoutes, Routes } from 'react-router-dom';
import { Error } from './components/error';
import { Home } from './components/home';

const PrimaryApp = lazy(() => import('PrimaryApp/App').catch(() => ({ default: () => <Error /> })));
const SecondApp = lazy(() => import('SecondApp/App').catch(() => ({ default: () => <Error /> })));

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "app-01", element: <Suspense fallback={<div>Carregando...</div>} > <PrimaryApp /> </Suspense> },
        { path: "app-02", element: <Suspense fallback={<div>Carregando...</div>} > <SecondApp /> </Suspense> },
      ]
    }
  ]);

  return routes;
}

export default App;
