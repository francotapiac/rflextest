import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialPrices } from '../redux/pricesSlice';
import DateRangeForm from '../components/DateRangeForm';
import PriceChart from '../components/PriceChart';
import EditablePriceTable from '../components/EditablePriceTable';
import { Container, Typography,Grid, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import ConversionCalculator from '../components/ConversionCalculator';



const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.prices.status);
  const prices = useSelector((state) => state.prices.prices);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInitialPrices());
    }
  }, [dispatch, status]);


  return (
    <Container spacing={3}>
       <Grid container spacing={1} mb={4}>

       <Box sx={{ bgcolor: '#F1F5F8 ', p: 2, width: '100%', margin: '0 auto', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
        <Grid container>
            {/* Añadir un título a la página */}
            <Grid item xs={12}>
              <Typography variant="h6" align="left" color="primary.main" fontWeight="bold">
                    Calculadora de peso a dolar
              </Typography>
            </Grid>

            {/* Fecha actual*/}
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left" color="primary.light" fontStyle="italic">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Grid>

            {/* Valor actual dolar */}
            <Grid item xs={12} align="center">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} mb={2} mt={4}>
                    <ConversionCalculator />  
                </Box>
                <Divider variant="middle" style={{ backgroundColor: '#ccc' }} />
                <Typography variant="body" color="primary.light" fontStyle="italic">Dolar hoy</Typography>
                  <Typography variant="h6" p={1} fontWeight="bold"> 1 USD = {prices.length > 0 ? prices[prices.length - 1].price : '0'}</Typography>
                <Divider variant="middle" style={{ backgroundColor: '#ccc' }} />
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ width: '100%', margin: '0 auto' }}>
            <Box sx={{  p: 2, mb: 2 }}>
                <Grid container>
                    {/* Formulario de rango de fechas */}
                    <Grid item xs={12}>
                      <DateRangeForm />
                    </Grid>
                    {/* Gráfico */}
                    <Grid item xs={12}>
                        <PriceChart />
                    </Grid>
                </Grid>
            </Box>

            {/* Tabla de precios */}
            <Box >
                <Grid container>
                    <Grid item xs={12}>
                        <EditablePriceTable />
                    </Grid>
                </Grid>
            </Box>
        </Box>

      </Grid>
    </Container>
  );
};

export default Home;