import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Box, Table } from '@mui/material';
import Home from './pages/home';
import TablePrice from './pages/tablePrice';
import Chart from './pages/chartPrice'; 
import Navbar from './components/Navbar';


export default function App() {
  return (
    <Router>
      <Navbar />
      <Box sx={{ mt: 2 }}>
        <Container sx={{ mt: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/table" element={<TablePrice />} />
            <Route path="/chart" element={<Chart />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}