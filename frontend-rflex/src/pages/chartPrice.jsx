import React from 'react';
import { Grid } from '@mui/material';
import PriceChart from '../components/PriceChart';
import DateRangeForm from '../components/DateRangeForm';

const Chart = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DateRangeForm />
      </Grid>
      <Grid item xs={12}>
        <PriceChart />
      </Grid>
    </Grid>
  );
};

export default Chart;