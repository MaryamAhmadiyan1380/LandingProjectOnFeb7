import { TextField, Box, Stack, Button,InputAdornment,IconButton ,Typography  } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom'
import useLogin from '../../Hook/useLogin';
import { useState } from 'react';
import {Visibility , VisibilityOff} from '@mui/icons-material'

const schema = yup.object().shape({
  email: yup.string().email('ایمیل نامعتبر است').required('لطفا ایمیل را وارد کنید'),
  password: yup.string().required('لطفا رمز عبور را وارد کنید'),
});

const Login = ({ onSwitchToSignUp }) => {
  const navigate = useNavigate()
  const loginQuery = useLogin();
  const [showPassword , setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } , trigger , reset } = useForm({
    resolver: yupResolver(schema)});
    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleNotShowPassword = (event) => event.preventDefault()
    const onSubmit = (data) => {
      console.log('Login data is: ', data);
    
        loginQuery.mutate(
          { ...data },
          {
            onSuccess: (response) => {
              console.log('login response is:', response);
    
              if (response?.access_token && response?.refresh_token) {
                console.log('Token received', response.access_token, response.refresh_token);
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                navigate('/'); 
                reset();
              } else {
                console.error('Token not received');
                setErrorMessage('اطلاعات وارد شده صحیح نیست. لطفاً دوباره تلاش کنید.');
               
              }
            },
            onError: (error) => {
              console.error('Login Error is:', error);
              const errorMessage = error?.response?.data?.message || 'ورود ناموفق بود. لطفاً اطلاعات را بررسی کنید.';
              setErrorMessage(errorMessage);
    
             
            }
          }
        );
      
    };

  // const goToSignUp = () => {
  //   navigate('/signup')
  // }
  return (
    <form style={{ marginTop: "150px" }} onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{ color: "#703BF7", fontSize: "60px" }}>ورود</h1>

      <Box sx={{ marginTop: "40px" }}>
        <span style={{ fontSize: "23px" }}>آدرس ایمیل: </span><br />
        <Stack style={{ width: '35ch', margin: 'auto', backgroundColor: "#F3F3F3" }}>
          <TextField id="outlined-basic1" variant="outlined" {...register('email')} inputProps={{  autoComplete: "new-password", }} onBlur={() => trigger('email')}/>
        </Stack>
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </Box>
      <Box sx={{ marginTop: "15px" }}>
        <span style={{ fontSize: "23px" }}>رمز عبور: </span><br />
        <Stack style={{ width: '35ch', margin: 'auto', backgroundColor: "#F3F3F3" }}>
        <TextField 
            id="outlined-basic2" 
            variant="outlined" 
            type={showPassword ? 'text' : 'password'} 
            {...register('password')}
            InputProps={{
              autoComplete: "new-password",
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={showPassword ? 'hidePassword' : 'showPassword'}
                    onClick={handleShowPassword}
                    onMouseDown={handleNotShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onBlur={() => trigger('password')}
          />
        </Stack>
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </Box>

      {errorMessage && <Typography color="error" textAlign="center" mb={2}>{errorMessage}</Typography>}
      <Stack style={{ width: "25ch", margin: 'auto', marginTop: "30px", flexDirection: "column" }}>
        <Button style={{ backgroundColor: "#703BF7" }} type="submit" variant="contained">ورود</Button>
        <Button onClick={onSwitchToSignUp} style={{ marginTop: "10px", backgroundColor: "#333333", color: "wheat" }} variant="outlined">ثبت نام</Button>
      </Stack>
    </form>
  );
}

export default Login;
