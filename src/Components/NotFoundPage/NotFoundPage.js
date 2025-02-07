import NotFoundPagePic from '../../Icons/404page.png'
// import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import pic from '../../Icons/pic3.png'
const NotFoundPage = () => {
    return (
        <div style={{width:"100%" , height:"100vh",backgroundColor :"#f0f0f0"}}>
            <img src={NotFoundPagePic} alt='404pic' style={{margin:"auto",marginTop:"200px",width:"200px",height:"200px",objectFit:"cover"}} />
            {/* <h1 style={{margin:"auto",color:"red",marginTop:"300px",fontSize:"60px"}}>404</h1> */}
            
            <div>
            {/* <YoutubeSearchedForIcon style={{fontSize:"40px",margin:"auto",color:"red"}} /> */}
            <img src={pic} />
            </div>
            <h1>!این صفحه پیدا نشد <br/> لطفا مجدد آدرس را به درستی سرچ کنید</h1>

        </div>
        
    )
}
export default NotFoundPage;