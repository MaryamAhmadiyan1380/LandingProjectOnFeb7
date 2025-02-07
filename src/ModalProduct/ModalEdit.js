import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ModalEdit = ({ open, handleClose, handleEdit, newProduct, handleInputChange, errors }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="edit-category-modal">
      <Box sx={style}>
        <Typography id="edit-category-modal" variant="h6" component="h2">
          <EditIcon /> ویرایش محصول
        </Typography>
        <Typography id="modal-description" style={{ display: "block", alignItems: "center", marginLeft: "30px" }}>
          <TextField 
            id="title" 
            label="* عنوان" 
            variant="outlined" 
            placeholder="عنوان را وارد کنید" 
            style={{ marginTop: "25px" }} 
            onChange={handleInputChange} 
            value={newProduct?.title} 
            name="title" 
          />
          {errors.title && <Typography color="error">{errors.title}</Typography>}
          <TextField 
            id="price" 
            label="* قیمت" 
            variant="outlined" 
            placeholder="قیمت را وارد کنید" 
            style={{ marginTop: "25px" }} 
            onChange={handleInputChange} 
            value={newProduct?.price} 
            name="price" 
          />
          {errors.price && <Typography color="error">{errors.price}</Typography>}
          <Typography style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
            <Button variant="contained" style={{ width: "170px" }} onClick={handleEdit}>ذخیره تغییرات</Button>
            <Button variant="outlined" style={{ width: "170px" }} onClick={handleClose}>خروج</Button>
          </Typography>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
