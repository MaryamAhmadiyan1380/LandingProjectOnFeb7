import React from 'react'
import {Modal , Stack , Button , Typography, Box, Fade , Backdrop} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

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

const ModalDelete = ({open , handleClose , handleDelete , productToDelete}) => {
    return(
        
      <Modal open={open} onClose={handleClose} aria-labelledby="delete-modal-title" aria-describedby="delete-modal-description" closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }} >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="delete-modal-title" variant="h6" component="h2">
            حذف محصول <DeleteForeverIcon />
          </Typography>
          <Typography id="delete-modal-description" sx={{ mt: 2 }}>
            آیا شما مطمئنی که می‌خواهید محصول "{productToDelete?.title}" را حذف کنید؟
          </Typography>


          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" color="error" onClick={handleDelete}>  حذف  </Button>
            <Button variant="outlined" onClick={handleClose}>  خروج </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
    )

}
export default ModalDelete;