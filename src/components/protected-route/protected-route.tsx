import { selectIsAuthChecked, selectUser } from '@slices/user';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '@services/store';

import type { ProtectedRouteProps, TProtectedRouteState } from './type';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    const fromPath =
      (location.state as TProtectedRouteState | null)?.from?.pathname ?? '/';
    return <Navigate to={fromPath} replace />;
  }

  return children;
};
