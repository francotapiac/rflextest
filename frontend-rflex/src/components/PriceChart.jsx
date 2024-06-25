import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const PriceChart = () => {
  const prices = useSelector((state) => state.prices.prices);
  const status = useSelector((state) => state.prices.status);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', height: 400 }}>
        <Skeleton variant="rectangular" width="100%" height={400} animation="wave" />
      </Box>
    );
  }

  if (status === 'failed') {
    return <Typography color="error">La data no se ha cargado correctamente</Typography>;
  }

  const formatXAxis = (tickItem) => {
    const [year, month, day] = tickItem.split('-');
    return `${day}-${month}-${year}`;
  };
  return (
    <Box sx={{ backgroundColor: '#1f2333', borderRadius: 4, padding: 2 }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={prices} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} style={{ backgroundColor: '#1f2333' }} >
          <CartesianGrid strokeDasharray="3 3" stroke="#586185" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} angle={-20} textAnchor="end" stroke="#E4E5E6"/>
          <YAxis stroke="#E4E5E6" />
          <Tooltip />
          <Legend align="right" verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="price" stroke="#f68b00" dot={false} name="CLP" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PriceChart;