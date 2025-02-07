import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  Box, Button, TextField, InputAdornment, IconButton, Stack, Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import useSignUp from '../../Hook/useSignUp';
import { useState } from 'react';

const SignUp = () => {
  const schema = yup.object().shape({
    name: yup.string().required('لطفا نام را وارد کنید'),
    email: yup.string().email('ایمیل نامعتبر است').required('لطفا ایمیل را وارد کنید'),
    password: yup.string().min(4, 'رمز عبور باید حداقل ۴ کاراکتر باشد').required('لطفا رمز عبور را وارد کنید'),
    avatar: yup.string().url('آدرس آواتار معتبر نیست').required('لطفا آدرس آواتار را وارد کنید'),
  });

  const navigate = useNavigate();
  const signUpQuery = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleNotShowPassword = (event) => event.preventDefault();

  const onSubmit = (data) => {
    setErrorMessage('');

    signUpQuery.mutate(data, {
      onSuccess: (res) => {
        console.log('پاسخ API:', res);

        if (res && res.id) {
          console.log('ثبت‌نام موفقیت‌آمیز:', res);
          reset(); // پاک کردن فیلدها
          navigate('/login'); // هدایت به صفحه ورود
        } else {
          console.error('خطای غیرمنتظره در ثبت‌نام:', res);
          setErrorMessage('اطلاعات وارد شده صحیح نیست. لطفاً دوباره تلاش کنید.');
        }
      },
      onError: (error) => {
        console.error('خطای ثبت‌نام:', error);
        const errorMsg = error?.response?.data?.message || 'ثبت‌نام ناموفق بود. لطفاً اطلاعات را بررسی کنید.';
        setErrorMessage(errorMsg);
      },
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 2,direction:"rtl" }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 2,
          width: '100%',
          maxWidth: 400,
          p: 3,
          boxShadow: 3,
          marginTop: '20px',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
          <Typography variant="h5">ثبت نام</Typography>
        </Box>

        <Stack spacing={1}>
          <Typography variant="body2">نام:</Typography>
          <TextField fullWidth {...register('name')} onBlur={() => trigger('name')} />
          {errors.name && <Typography color="error">{errors.name.message}</Typography>}
        </Stack>

        <Stack spacing={1}>
          <Typography variant="body2">ایمیل : </Typography>
          <TextField fullWidth {...register('email')} onBlur={() => trigger('email')} />
          {errors.email && <Typography color="error">{errors.email.message}</Typography>}
        </Stack>

        <Stack spacing={1}>
          <Typography variant="body2">رمز عبور:</Typography>
          <TextField
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            onBlur={() => trigger('password')}
            InputProps={{
              autoComplete: 'new-password',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} onMouseDown={handleNotShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.password && <Typography color="error">{errors.password.message}</Typography>}
        </Stack>

        <Stack spacing={1}>
          <Typography variant="body2">آواتار:</Typography>
          <TextField fullWidth {...register('avatar')} onBlur={() => trigger('avatar')} />
          {errors.avatar && <Typography color="error">{errors.avatar.message}</Typography>}
        </Stack>

        {errorMessage && <Typography color="error" textAlign="center" mt={1}>{errorMessage}</Typography>}

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ width: '100px' }}>ثبت نام</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
