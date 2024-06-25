import React from 'react';
import { Grid } from '@mui/material';
import EditablePriceTable from '../components/EditablePriceTable';

const TablePrice = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EditablePriceTable />
      </Grid>
    </Grid>
  );
};

export default TablePrice;
