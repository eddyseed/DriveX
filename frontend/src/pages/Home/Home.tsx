import React from 'react';
import LandingPage from './Components/LandingPage';
import CateogorySection from './Components/CategoryPage';

const Home: React.FC = () => {
  return (
    <div>
      <LandingPage/>
      <CateogorySection/>
    </div>
  );
};

export default Home;