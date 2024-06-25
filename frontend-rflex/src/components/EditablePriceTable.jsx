import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  IconButton,
  Box,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Add as AddIcon, Delete as DeleteIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { updatePrice, addPrice,deletePrice } from '../redux/pricesSlice'; 


const EditablePriceTable = () => {
  const dispatch = useDispatch();
  const prices = useSelector((state) => state.prices.prices);
  const status = useSelector((state) => state.prices.status);
  const [editedPrices, setEditedPrices] = useState([]);
  const [newRow, setNewRow] = useState({ date: '', price: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    setEditedPrices(
      prices
        .map((price, index) => ({ id: index + 1, ...price }))
        .sort((a, b) => (isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)))
    ); // Añadir IDs únicos y ordenar por fecha
  }, [prices, isAscending]);

  useEffect(() => {
    editedPrices.forEach(({ date, price }) => {
      dispatch(updatePrice({ date, price }));
    });
  }, [editedPrices, dispatch]);

  const handleEdit = (id, field, value) => {
    const updatedPrices = editedPrices.map((price) =>
      price.id === id ? { ...price, [field]: value } : price
    );
    setEditedPrices(updatedPrices);
  };

  const handleAddRow = () => {
    if (newRow.date && newRow.price) {
      const newId = editedPrices.length ? editedPrices[editedPrices.length - 1].id + 1 : 1;
      const newPrice = { id: newId, date: newRow.date, price: parseFloat(newRow.price) };
      const updatedPrices = [...editedPrices, newPrice].sort((a, b) => new Date(a.date) - new Date(b.date));
      setEditedPrices(updatedPrices);
      dispatch(addPrice(newPrice)); // Actualizar el estado global de Redux
      setNewRow({ date: '', price: '' });
    }
  };

  const handleDelete = (id) => {
    setEditedPrices(editedPrices.filter((price) => price.id !== id));
    dispatch(deletePrice(id));
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', height: 400 }}>
        <Skeleton variant="rectangular" width="100%" height={400} animation="wave" />
      </Box>
    );
  }

  return ( 
    <>
      <Paper style={{ width: '100%', height: '100%', padding: '20px', borderRadius: 10}} >
      {/* Botón para abrir el modal flotante */}
        <TableContainer sx={{borderRadius: 10}} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Fecha
                  <IconButton size="small" onClick={toggleSortOrder}>
                    {isAscending ? <ArrowUpward /> : <ArrowDownward />}
                  </IconButton>
                </TableCell>
                <TableCell>Peso</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editedPrices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((price) => (
                <TableRow key={price.id}>
                  <TableCell>{formatDate(price.date)}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={price.price}
                      onChange={(e) => handleEdit(price.id, 'price', parseFloat(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                  <IconButton color="primary" onClick={() => handleDelete(price.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <TextField
                    type="date"
                    value={newRow.date}
                    onChange={(e) => setNewRow({ ...newRow, date: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={newRow.price}
                    onChange={(e) => setNewRow({ ...newRow, price: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={handleAddRow}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={editedPrices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default EditablePriceTable;
