import { Routes, Route } from 'react-router-dom';
import BrandsPage from './pages/BrandsPage';
import ModelsPage from './pages/ModelsPage';
import GuitarDetailsPage from './pages/GuitarDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BrandsPage />} />
      <Route path="/brand/:brandId" element={<ModelsPage />} />
      <Route path="/brand/:brandId/guitar/:guitarId" element={<GuitarDetailsPage />} />
    </Routes>
  );
}

export default App;
