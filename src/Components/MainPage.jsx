import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavbarPage from "./NavbarPage";
import useProduct from "../Hook/useProduct";
import Footer from "./Footer";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import '../Styles/MainPage.css';
import useGetCategories from '../Hook/useGetCategories';

const RTLContainer = styled.div`
  direction: rtl;
  text-align: right;
   background-color :rgb(239, 231, 240);
`;

const MainGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 16px;
  margin: 20px;

  @media (max-width : 768px){
  grid-template-columns : 1fr;
  }
`;

const CategoriesContainer = styled.div`
  width: 250px;
  height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  position: sticky;
  top: 90px;
  align-self: start;

  @media(max-width : 768px){
  width : 100%;
  flex-direction : row;
  overflow-x : auto;
  position : relative;
  top : 0;
  padding : 10px;
  white-space : nowrap;
  }
`;

const CategoryItem = styled.li`
  list-style: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;
  background-color: ${({ $active }) => ($active ? "purple" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "black")};

  &:hover {
    background-color: ${({ $active }) => ($active ? "darkpurple" : "#ddd")};
  }
    @media(max-width : 768px){
    display : inline-block;
    padding : 8px 15px;
    font-size : 14px;
    white-space : nowrap;

    }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
 

  @media(max-width : 1024px){
  grid-template-columns : repeat(2 , 1fr)
  }
  @media(max-width : 768px){
  grid-template-columns : 1fr;
  }
`;

const ItemContainer = styled.div`
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  position: relative;
  
  @media(max-width : 768px){
  height : auto;
  }
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-top: 35px;
  @media(max-width : 768px){
  height : 200px;
  max-width : 100%;
  }
`;

const NewTag = styled.p`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: yellow;
  color: black;
  padding: 4px 8px;
  border-radius: 2px 10px 0 10px;
  margin: 0;
`;

const DivStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;
const BuyButton = styled.button`
  margin: 10px;
  border-style: none;
  border-radius: 20px;
  background: #0080ff;
  width: 180px;
  height: 40px;
  display : flex;
  align-items : center;
  justify-content : center;
  color : white;
  font-size : 14px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const MainPage = () => {
  const [data, setData] = useState([]);
  const { mutate: fetchProduct } = useProduct();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const navigate = useNavigate();
  const { mutate: fetchCategories } = useGetCategories();

  useEffect(() => {
    fetchProduct(
      {},
      {
        onSuccess: (response) => {
          setData(response);
        },
        onError: (error) => {
          console.error("Error fetching products:", error);
        }
      }
    );
  }, [fetchProduct]);

  useEffect(() => {
    fetchCategories(
      {},
      {
        onSuccess: (response) => {
          setCategories(response);
        },
        onError: (error) => {
          console.error("Error fetching categories:", error);
        }
      }
    );
  }, [fetchCategories]);

  const categorizedProducts = data.reduce((acc, item) => {
    const category = categories.find(cat => cat.id === item.category?.id)?.name || "متفرقه";
    acc[category] = acc[category] || [];
    acc[category].push(item);
    return acc;
  }, {});

  const goToLoginComponent = () => {
    navigate('/loginandsignup');
  };

  useEffect(() => {
    if (selectedCategory !== '0') {
      const element = document.getElementById(`category-${selectedCategory}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedCategory]);

  const categoriesWithProducts = categories.filter(category => 
    data.some(product => product.category?.id === category.id)
  );
  return (
    <>
      <RTLContainer>
        <NavbarPage />
        <MainGridContainer>
          <CategoriesContainer>
            <p>دسته‌بندی محصولات:</p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {categoriesWithProducts.map((category) => (
                <CategoryItem
                  key={category.id}
                  $active={selectedCategory === category.id.toString()}
                  onClick={() => setSelectedCategory(category.id.toString())}
                >
                  {category.name} 
                </CategoryItem>
              ))}
            </ul>
          </CategoriesContainer>
          <div>
            {Object.entries(categorizedProducts).map(([category, products]) => (
              <div id={`category-${categories.find(cat => cat.name === category)?.id}`} key={category}>
                <h3>{category}</h3>
                <GridContainer>
                  {products.map((item) => (
                    <ItemContainer key={item.id}>
                      <NewTag>جدید</NewTag>
                      <Image src={item.images[0]} alt={item.title} />
                      <h5 style={{ textAlign: "center" }}>{item.title}</h5>
                      <DivStyle>
                        <p style={{ color: "#FF4040", borderRadius: "2px", width: "50px", textAlign: "center", margin: "20px" }}>
                          {item.price} تومان
                        </p>
                        <BuyButton
                         
                          onClick={goToLoginComponent}
                        >
                          <AddShoppingCartIcon />
                          اضافه کردن به سبد خرید
                        </BuyButton>
                      </DivStyle>
                    </ItemContainer>
                  ))}
                </GridContainer>
              </div>
            ))}
          </div>
        </MainGridContainer>
      </RTLContainer>
      <Footer />
    </>
  );
};

export default MainPage;
