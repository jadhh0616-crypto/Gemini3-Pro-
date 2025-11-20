import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BenchmarkTable from './components/BenchmarkTable';
import DetailView from './components/DetailView';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BenchmarkTable />} />
        <Route path="/benchmark/:id" element={<DetailView />} />
      </Routes>
    </Router>
  );
};

export default App;
