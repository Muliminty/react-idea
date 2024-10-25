import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '@/routes';

const App = () => {
  
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />} // 使用 element 属性
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
