import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import Home from '../pages/Home';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='' element={<Home />} />
      </Route>
    </Routes>
  );
}
