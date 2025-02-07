import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styled from "styled-components";
import Button from '@mui/material/Button';
import { Stack, Modal, Box, FormControl, InputLabel, OutlinedInput, Typography, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useSignUp from '../Hook/useSignUp';
import { useNavigate } from 'react-router-dom';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const RTLContainer = styled.div`
  direction: rtl;
  text-align: right;
  background-color : #E9C3F0;
`;

const NavbarPage = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const signUpQuery = useSignUp();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage('');
    reset();
  };

  const schema = yup.object().shape({
    name: yup.string().required('لطفا نام را وارد کنید'),
    email: yup.string().email('ایمیل نامعتبر است').required('لطفا ایمیل را وارد کنید'),
    password: yup.string().min(4, 'رمز عبور باید حداقل 4 کاراکتر باشد').required('لطفا رمز عبور را وارد کنید'),
    avatar: yup.string().url('آواتار باید یک لینک معتبر باشد').required('لطفا آواتار را وارد کنید'),
  });

  const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setErrorMessage('');  
  
    signUpQuery.mutate(data, {
      onSuccess: (res) => {
        console.log(' پاسخ API:', res);
  
        
        if (res && res.id ) {
          console.log(' ثبت‌نام موفقیت‌آمیز:', res);
          handleClose();
          navigate('/login');
        } else {
          console.error(' خطای غیرمنتظره در ثبت‌نام:', res);
          setErrorMessage('اطلاعات وارد شده صحیح نیست. لطفاً دوباره تلاش کنید.');
        }
      },
      onError: (error) => {
        console.error(' خطای ثبت‌نام:', error);
  
        const errorMessage = error?.response?.data?.message || 'ثبت‌نام ناموفق بود. لطفاً اطلاعات را بررسی کنید.';
        setErrorMessage(errorMessage);
  
      }
    });
  };
  

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }}>
      <RTLContainer>
        <Navbar data-bs-theme="dark" style={{ backgroundColor : '#E9C3F0' }}>
          <Container>
            <Nav style={{ alignItems: "right" }}>
              <Nav.Link href="#products" style={{ color: '#333' }}>
                <ProductionQuantityLimitsIcon /> محصولات
              </Nav.Link>
            </Nav>
            <Nav>
              <Stack spacing={2} direction="row">
                <Button style={{ marginLeft: "10px", backgroundColor: "#681479" }} variant="contained" onClick={handleOpen}>
                  ثبت نام / ورود
                </Button>
              </Stack>
            </Nav>
          </Container>
        </Navbar>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
            <Typography variant="h6" component="h5" textAlign="center" mb={2}>
              خوش آمدید! لطفاً اطلاعات را پر کنید.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl style={{ width: "100%", marginBottom: "10px" }}>
                <InputLabel>نام</InputLabel>
                <OutlinedInput {...register("name")} onBlur={() => trigger('name')} />
                {errors.name && <Typography color="error" variant="caption">{errors.name.message}</Typography>}
              </FormControl>

              <FormControl style={{ width: "100%", marginBottom: "10px" }}>
                <InputLabel>ایمیل</InputLabel>
                <OutlinedInput type="email" {...register("email")} onBlur={() => trigger('email')} />
                {errors.email && <Typography color="error" variant="caption">{errors.email.message}</Typography>}
              </FormControl>

              <FormControl style={{ width: "100%", marginBottom: "10px" }}>
                <InputLabel>رمز عبور</InputLabel>
                <OutlinedInput type="password" {...register("password")} onBlur={() => trigger('password')} />
                {errors.password && <Typography color="error" variant="caption">{errors.password.message}</Typography>}
              </FormControl>

              <FormControl style={{ width: "100%", marginBottom: "10px" }}>
                <InputLabel>آواتار</InputLabel>
                <OutlinedInput type="text" {...register("avatar")} onBlur={() => trigger('avatar')} />
                {errors.avatar && <Typography color="error" variant="caption">{errors.avatar.message}</Typography>}
              </FormControl>

              {errorMessage && <Typography color="error" textAlign="center" mb={2}>{errorMessage}</Typography>}

              <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
                <Button type="submit" variant="contained" color="primary" disabled={signUpQuery.isLoading}>
                  {signUpQuery.isLoading ? <CircularProgress size={24} /> : "ثبت نام"}
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>خروج</Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </RTLContainer>
    </div>
  );
}

export default NavbarPage;
