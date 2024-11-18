import { BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from '@/routes';
import { renderRoutes } from './routes/renderRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        {renderRoutes(routes)}
      </Routes>
    </Router>
  );
};

export default App;
