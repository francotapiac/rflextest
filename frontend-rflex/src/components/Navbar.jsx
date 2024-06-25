import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" component={Link} to="/">
          <AttachMoneyIcon />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1 }}>
          Precio del dólar
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" component={Link} to="/">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/table">
            <TableChartIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/chart">
            <BarChartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
