import Footer from "../Footer";
import ProductNavbar from "../ProductNavbar";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  direction: rtl;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 10px;
  background-color : #E9C3F0;
`;

const Title = styled.h1`
  margin: 30px 0;
`;

const AboutMeContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const Paragraph = styled.p`
  color: #666;
  margin: 10px 0;
`;

const Subtitle = styled.h3`
  color: #333;
`;

const AboutMe = () => {
  return (
    <>
      <ProductNavbar />
      <Container>
        <AboutMeContainer>
          <Title>درباره من</Title>
          <Paragraph>نام: [مریم احمدیان شیاده ]</Paragraph>
          <Paragraph>سن: [23]</Paragraph>
          <Paragraph>محل تولد: [استان مازندران، شهر بابل]</Paragraph>
          <Subtitle>تجربیات و حرفه</Subtitle>
          <Paragraph>[آشنایی با Html, Css , BootStrap5 , JavaScript, ReactJs]</Paragraph>
          <Subtitle>اهداف و انگیزه‌ها</Subtitle>
          <Paragraph>[علاقه مند به شغل برنامه نویسی هستم که در دانشگاه با سی شارپ طراحی سایت و دیتابیس ها آشنا شدم <br/> بعد از آن یک دوره مقدماتی سی پلاس پلاس را گذراندم و بعد دوره مقدماتی پایتون و در حال حاضرحدودا یکسال است که کارآموز حوزه فرانت اند هستم ،<br/> امیدوارم با شروع کار در این حوزه بتوانم حرفه ای شوم و دستاورد های خوبی داشته باشم ]</Paragraph>
          <Subtitle>راه‌های ارتباطی</Subtitle>
          <Paragraph>ایمیل: [mrymahmdyan712@gmail.com]</Paragraph>
          <Paragraph>شماره تماس: [09114755524]</Paragraph>
        </AboutMeContainer>
      </Container>
      <Footer />
    </>
  );
}

export default AboutMe;
