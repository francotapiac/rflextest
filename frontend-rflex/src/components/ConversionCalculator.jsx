import React, { useState,useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TextField, Button, Box } from '@mui/material';
import { ReactCountryFlag  } from 'react-country-flag';

const ConversionCalculator = () => {
    const [dollarValue, setDollarValue] = useState('');
    const [pesoValue, setPesoValue] = useState('');
    const prices = useSelector((state) => state.prices.prices);
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setDollarValue(value);
    };
  
    const convertDollarToPeso = (dollarAmount) => {
      const latestPrice = prices.length > 0 ? prices[prices.length - 1].price : 0;
      return dollarAmount * latestPrice;
    };
  
    useEffect(() => {
      const dollarAmount = parseFloat(dollarValue);
      if (!isNaN(dollarAmount)) {
        const convertedAmount = convertDollarToPeso(dollarAmount);
        setPesoValue(convertedAmount.toFixed(2));
      } else {
        setPesoValue('');
      }
    }, [dollarValue, prices]);
  
    return (
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <Box display="flex" alignItems="center" mr={2}>
          <ReactCountryFlag countryCode="US" svg />
          <TextField
            id="dollarInput"
            label="Ingrese dólar"
            type="number"
            value={dollarValue}
            onChange={handleInputChange}
            variant="outlined"
            style={{ marginLeft: '10px', marginRight: '10px' }}
          />
        </Box>
        <ArrowForwardIcon style={{ fontSize: 30 }} />
        <Box display="flex" alignItems="center" ml={2}>
          <ReactCountryFlag countryCode="CL" svg />
          <TextField
            id="pesoOutput"
            label="Valor en peso"
            type="number"
            value={pesoValue}
            disabled
            variant="outlined"
            style={{ marginLeft: '10px' }}
          />
        </Box>
        <Button variant="contained" color="primary" onClick={() => setDollarValue('')} style={{ marginLeft: '10px' }}>
          Limpiar
        </Button>
      </Box>
    );
  };
  
  export default ConversionCalculator;