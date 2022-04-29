import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import Login from '../pages/Login';

export default function authRouter() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
    </Routes>
  );
}
