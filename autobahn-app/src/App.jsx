import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AutobahnListe from './components/AutobahnListe';
// import AutobahnDetail from './components/AutobahnDetail';
import Baustellen from './components/Baustellen';
import Warnungen from './components/Warnungen';
import Ladestationen from './components/Ladestationen';

function App() {
  return (
      <Routes>
        <Route path="/" element={<AutobahnListe />} />
        {/* <Route path="/autobahn/:roadId" element={<AutobahnDetail />} /> */}
        <Route path="/autobahn/:roadId/baustellen" element={<Baustellen />} />
        <Route path="/autobahn/:roadId/warnungen" element={<Warnungen />} />
        <Route path="/autobahn/:roadId/ladestationen" element={<Ladestationen />} />
      </Routes>
  );
}

export default App;
