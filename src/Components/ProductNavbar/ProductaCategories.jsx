import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ProductNavbar from "../ProductNavbar";
import useProduct from '../../Hook/useProduct';

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  background-color : #E9C3F0;
  @media (max-width : 768px){
  grid-template-coloumns : repeat(2 , 1fr);
  }
  @media(max-width : 480px){
  grid-template-coloumns : repeat(1 , 1fr);
  }
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    max-height: 150px;
  }
`;

const ProductTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #666;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ProductsCategories = () => {
  const [data, setData] = useState([]);
  const { mutate: fetchProduct } = useProduct();

  useEffect(() => {
    fetchProduct({}, 
        {
         onSuccess: (res) => {
            console.log('category response is:', res);
            setData(res);
          },
          onError: (error) => {
            console.error('category error is:', error);
          }
        }
    );
  }, [fetchProduct]);

  return (
    <>
      <ProductNavbar />
      <div style={{ paddingTop: '80px',backgroundColor:" #E9C3F0" }}> 
        <GridContainer>
          {data.map((product, index) => (
            <ProductCard key={index}>
              <StyledImage src={product.images[0]} alt={product.title} />
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>{product.price} تومان</ProductPrice>
            </ProductCard>
          ))}
        </GridContainer>
      </div>
    </>
  );
};

export default ProductsCategories;
