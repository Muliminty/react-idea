import { Route } from 'react-router-dom';

export const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    const { path, component: Component, children } = route;
    return (
      <Route
        key={index}
        path={path}
        element={<Component />}
      >
        {/* 如果有子路由，则递归渲染 */}
        {children && renderRoutes(children)}
      </Route>
    );
  });
};
