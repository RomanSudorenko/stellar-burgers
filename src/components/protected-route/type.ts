import type { Location } from 'react-router-dom';

export type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element;
};

export type TProtectedRouteState = {
  from?: Location;
};
