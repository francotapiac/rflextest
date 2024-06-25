import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPricesByDateRange } from '../redux/pricesSlice';
import { TextField, Button, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import EditablePriceTableModal from '../components/EditablePriceTableModal';

const DateRangeForm = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    dispatch(fetchPricesByDateRange({ startDate, endDate }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} >
    <Box
            display="flex"
            justifyContent="flex-start"  // Alinea los elementos hacia la derecha
            alignItems="center"        // Centra verticalmente los elementos
            height={100}                // Altura opcional para el contenedor
            gap={1}
        >
        <DatePicker
          label="Fecha de inicio"
          value={startDate}
          inputFormat="yyyy-MM-dd"
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Fecha de fin"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Actualizar
        </Button>
        
        </Box>
    </LocalizationProvider>
  );
};

export default DateRangeForm;