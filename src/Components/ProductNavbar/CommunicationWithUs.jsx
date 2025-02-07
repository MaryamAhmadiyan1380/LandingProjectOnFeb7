import ProductNavbar from "../ProductNavbar"
import '../../Styles/CommunicationWithUs.css'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const CommunicationWithUs = () => {
    const schema = yup.object().shape({
        name : yup.string().required('فیلد نام اجباری است'),
        lastname : yup.string().required('فیلد نام خانوادگی اجباریست'),
        email : yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('فیلد ایمیل اجباری است'),
        phone : yup.string().matches(/^[0-9]+$/, 'لطفا شماره را به عدد وارد کنید').required('فیلد شماره همراه اجباریست'),
        subject : yup.string().required('فیلد موضوع پیام اجباریست'),
        message : yup.string().required('فیلد پیام اجباریست'),
    })
    const {register , handleSubmit , reset , trigger, formState : {errors}} =useForm({resolver:yupResolver(schema)})
    const onSubmit = (data) => {
        console.log('Communication With Us data is: ', data);
        reset()
    }
    return (
        <>
            <ProductNavbar />
            <div className='contact-container' style={{backgroundColor: '#E9C3F0'}}>
                <h2>ارتباط با ما</h2>
                <form className='contact-form' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='name' >نام:</label>
                    <input type='text' id='name' name='name' {...register('name')}  onBlur={() => trigger('name')} required />
                    {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}

                    <label htmlFor='lastname' >نام خانوادگی:</label>
                    <input type='lastname' id='lastname' name='lastname' {...register('lastname')}  onBlur={() => trigger('lastname')} required />
                    {errors.lastname && <p style={{color:'red'}}>{errors.lastname.message}</p>}

                    <label htmlFor='email' >ایمیل:</label>
                    <input type='text' id='email' name='email' {...register('email')}  onBlur={() => trigger('email')} required />
                    {errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}

                    <label htmlFor='phone' >شماره تلفن:</label>
                    <input type='text' id='phone' name='phone' {...register('phone')}  onBlur={() => trigger('phone')} required />
                    {errors.phone && <p style={{color:'red'}}>{errors.phone.message}</p>}

                    <label htmlFor='subject' >موضوع:</label>
                    <input type='text' id='subject' name='subject' {...register('subject')}  onBlur={() => trigger('subject')} required  />
                    {errors.subject && <p style={{color:'red'}}>{errors.subject.message}</p>}

                    <label htmlFor='message' >پیام:</label>
                    <textarea name='message' id='message' {...register('message')}  onBlur={() => trigger('message')} required/>
                    {errors.message && <p style={{color:'red'}}>{errors.message.message}</p>}

                    <button type='submit'>ارسال</button>
                </form>
                <div className="contact-info" style={{direction:"rtl"}}>
                    <p> <PhoneAndroidIcon/>اطلاعات تماس:09114755524</p>
                    <p><MailOutlineIcon/>ایمیل: mrymahmdyan712@gmail.com</p>
                    <p> <LocationOnIcon />آدرس :استان مازندران - شهرستان بابل</p>
                </div>
            </div>
        </>
    )
}
export default CommunicationWithUs;