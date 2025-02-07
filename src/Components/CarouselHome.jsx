import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Box } from '@mui/material';
import useProduct from '../Hook/useProduct';

const CarouselHome = () => {
  const { mutate: fetchProduct } = useProduct();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProduct({},
      {
        onSuccess: (res) => {
          console.log('response is: ', res);
          setData(res);
        },
        onError: (err) => {
          console.error('Error fetching products:', err);
        }
      }
    );
  }, [fetchProduct]);

  const getRandomSubset = (array, n) => {
    const randomPic = [...array].sort(() => 0.5 - Math.random());
    return randomPic.slice(0, n);
  };

  const randomProducts = getRandomSubset(data.filter(product => product.images && product.images.length > 0), 6);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Carousel style={{ width: '100%', height: '100%' }}>
        {randomProducts.map((product, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={product.images[0]}
              alt={product.title}
              style={{ height: '100vh', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3 style={{ color: 'gray' }}>{product.title}</h3>
              <p style={{ color: 'gray' }}>{product.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselHome;
