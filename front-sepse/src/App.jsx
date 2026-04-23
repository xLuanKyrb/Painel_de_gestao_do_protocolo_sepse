import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModoTV from './pages/ModoTV';
import PainelClinico from './pages/PainelClinico';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tv" element={<ModoTV />} />
        
        <Route path="/painel" element={<PainelClinico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;