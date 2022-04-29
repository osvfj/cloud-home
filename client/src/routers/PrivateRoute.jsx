import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute({ alreadyAuth }) {
  const auth = localStorage.getItem('ACCT');

  return auth ? <Outlet /> : <Navigate to='/login' />;
}
