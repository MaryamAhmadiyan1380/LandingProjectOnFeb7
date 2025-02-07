import React from 'react';
import {Button, TextField} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
const Footer = () => {
  const schema = yup.object().shape({
    email : yup.string().email('ایمیل نامعتبر است! لطفا یک ایمیل معتبر وارد کنید.').required('فیلد ایمیل اجباریست لطفا ایمیل را وارد کنید'),
  })
  const {register , handleSubmit , formState : {errors} , trigger, reset} = useForm({resolver:yupResolver(schema)})
  const onSubmit = (data) => {
    console.log('user email  is :',data);
    reset()
   
  }
  return (
      <>
      <hr style={{marginTop:"30px"}}/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column',  minHeight: '150px', padding: '20px', backgroundColor: '#F6F3F6'}}>
      
        <p style={{alignItems:"center",margin:"auto",marginLeft:"60px",marginTop:"60x"}}>Terms · Privacy Policy!</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <ul style={{ listStyleType: 'none', padding: 0, margin: '0 20px' }}>
        <li style={{ fontWeight: 'bold', color:'#8254F8' }}>محصولات</li>
        <li><a  style={{color:"black",textDecoration:"none"}} href="#">لباس</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">اثاثیه</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">لوازم الکترونیکی</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">کفش</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">متفرقه</a></li>
      </ul>
      <ul style={{ listStyleType: 'none', padding: 0, margin: '0 20px' }}>
        <li style={{ fontWeight: 'bold', color:'#8254F8' }}>منابع</li>
        <li ><a style={{color:"#202020",textDecoration:"none"}} href="#">داکیومنت</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">react.js,html,css,bootstrap</a></li>
        <li><a style={{color:"#202020",textDecoration:"none"}} href="#">بلاگ</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">chrome</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">متفرقه</a></li>
      </ul>
      <ul style={{ listStyleType: 'none', padding: 0, margin: '0 20px' }}>
        <li style={{ fontWeight: 'bold', color:'#8254F8' }}>خدمات</li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">پشتیبانی</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">سیاست حفظ حریم خصوصی</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">شرایط استفاده</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">تماس با ما</a></li>
        <li><a  style={{color:"#202020",textDecoration:"none"}} href="#">سوالات متداول</a></li>
      </ul>
      <ul style={{ listStyleType: 'none', padding: 0, margin: '0 20px' }}>
        <li style={{ fontWeight: 'bold', color:'#8254F8' }}>ثبت ایمیل</li>
        <p>هر ماه آخرین اخبار و مقالات را در صندوق ورودی خود دریافت کنید</p>
        <div style={{display:"flex",width:"300px",gap:"10px",alignItems:"center"}}>
          <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="standard-basic" label="ایمیل" variant="standard" style={{flex : 1}} {...register('email')} onBlur={() => trigger('email')} />
        <Button type='submit' variant="contained" endIcon={<SendIcon />} style={{marginTop:"15px",marginLeft:'15px'}}>ارسال</Button>
        {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}

        </form>
        </div>
      </ul>
      </div>
      
    </div>
    <hr/>
    </>
  );
}

export default Footer;
