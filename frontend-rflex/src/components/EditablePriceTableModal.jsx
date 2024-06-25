import React from 'react';
import { Button, Dialog, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import EditablePriceTable from './EditablePriceTable';

const EditablePriceTableModal = ({ isOpen, handleClose }) => {
  return (
    <Dialog
    open={isOpen}
    onClose={(e, reason) => {
      if (reason !== 'backdropClick') handleClose();
    }}
    disableEnforceFocus 
      PaperComponent={(props) => (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
          <Box {...props} sx={{  backgroundColor: '#1f2333',width: '80vw', height: '120vh', overflow: 'hidden', borderRadius: 10 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant="h6" color="#E4E5E6" align="center" ml={5} mt={2}>Tabla</Typography>
              <IconButton onClick={handleClose} style = {{color:"#f68b00"}}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ p: 2 }}>
              <EditablePriceTable />
            </Box>
          </Box>
        </Draggable>
      )}
    >
    </Dialog>
  );
};

export default EditablePriceTableModal;
