import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

const ModalAdd = ({ open, handleClose, handleInputChange, handleAddProduct, newProduct, errors }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-product-modal">
      <Box sx={style}>
        <Typography id="add-product-modal" variant="h6" component="h2">
          افزودن محصول <AddIcon />
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            id="title"
            label="* عنوان"
            variant="outlined"
            placeholder="عنوان را وارد کنید"
            onChange={handleInputChange}
            value={newProduct.title}
            name="title"
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
          <TextField
            id="price"
            label="* قیمت"
            variant="outlined"
            placeholder="قیمت را وارد کنید"
            onChange={handleInputChange}
            value={newProduct.price}
            name="price"
            error={Boolean(errors.price)}
            helperText={errors.price}
          />
          <TextField
            id="description"
            label="* توضیحات"
            variant="outlined"
            placeholder="توضیحات را وارد کنید"
            onChange={handleInputChange}
            value={newProduct.description}
            name="description"
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
          <TextField
            id="categoryId"
            label="* آیدی دسته بندی"
            variant="outlined"
            placeholder="آیدی دسته بندی را وارد کنید"
            onChange={handleInputChange}
            value={newProduct.categoryId}
            name="categoryId"
            error={Boolean(errors.categoryId)}
            helperText={errors.categoryId}
          />
          <TextField
            id="images"
            label="* تصویر"
            variant="outlined"
            placeholder="آدرس تصویر را وارد کنید"
            onChange={handleInputChange}
            value={newProduct.images}
            name="images"
            error={Boolean(errors.images)}
            helperText={errors.images}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" onClick={handleAddProduct}>
              ثبت
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              خروج
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAdd;
