import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/ProductNavbar.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useEffect } from 'react';

const RtlNavbar = styled.div`
  direction: rtl;
  text-align: right;
  font-size : 23px;
  font-family: "Times New Roman", serif;
  color : #333;

  .navbar-toggler {
    margin-left: auto;
  }

  .navbar-collapse {
    flex-grow: 1;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    .navbar-collapse {
      text-align: center;
    }
  }
`;

const ProductNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem('session_active', 'true');
    const handleBeforeUnload = () => {
      if (sessionStorage.getItem('session_active')) {
        sessionStorage.removeItem('session_active');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const goToHome = () => {
    navigate('/');
  };
  const goToProductsCategories = () => {
    navigate('/productscategories');
  };
  const goToManagementCategories = () => {
    navigate('/managementcategories');
  };
  const goToManagementProducts = () => {
    navigate('/managementproducts');
  };
  const goToAboutMe = () => {
    navigate('/aboutme');
  };
  const goToCommunicationWithUs = () => {
    navigate('/communicationwithus');
  };
  const exitLanding = () => {
    navigate('/mainpage');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <RtlNavbar>
      <Navbar expand="lg" style={{backgroundColor:"#916F98"}}>
        <Container>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={goToHome}
                className={location.pathname === '/' ? 'active-link' : ''}
                
              >
                خانه
              </Nav.Link>
              <Nav.Link
                onClick={goToProductsCategories}
                className={
                  location.pathname === '/productscategories' ? 'active-link' : ''
                }
              >
                دسته بندی محصولات
              </Nav.Link>
              <Nav.Link
                onClick={goToManagementCategories}
                className={
                  location.pathname === '/managementcategories' ? 'active-link' : ''
                }
              >
                مدیریت دسته بندی
              </Nav.Link>
              <Nav.Link
                onClick={goToManagementProducts}
                className={
                  location.pathname === '/managementproducts' ? 'active-link' : ''
                }
              >
                مدیریت محصولات
              </Nav.Link>
              <Nav.Link
                onClick={goToAboutMe}
                className={location.pathname === '/aboutme' ? 'active-link' : ''}
              >
                درباره ما
              </Nav.Link>
              <Nav.Link
                onClick={goToCommunicationWithUs}
                className={
                  location.pathname === '/communicationwithus' ? 'active-link' : ''
                }
              >
                ارتباط با ما
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link onClick={exitLanding} style={{ cursor: 'pointer' }}>
                خروج
                <ExitToAppIcon style={{ transform: 'rotate(180deg)' }} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </RtlNavbar>
  );
};

export default ProductNavbar;
