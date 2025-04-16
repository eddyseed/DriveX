import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  );
};

export default App;