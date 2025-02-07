import ProductNavbar from "../ProductNavbar";
import styled from 'styled-components';
import useProduct from '../../Hook/useProduct';
import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel, TextField } from '@mui/material';

const MenuProduct = styled.div`
  width: 300px;
  background-color: #EEEEEE;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 15px;
  }
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  position: relative;
  background-color : #E9C3F0;
  padding: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ItemContainer = styled.div`
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-top: 15px;
  border-radius: 10px;
`;

const DivStyle = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-start;
  width: 100%;
  background-color : #E9C3F0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 100%;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ManagementCategories = () => {
  const { mutate: fetchProduct } = useProduct();
  const [data, setData] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [nameSort, setNameSort] = useState('');
  const [priceSort, setPriceSort] = useState('');

  useEffect(() => {
    fetchProduct(
      {},
      {
        onSuccess: (response) => {
          console.log('Product response:', response);
          setData(response);
        },
        onError: (error) => {
          console.log('Error fetching products:', error);
        },
      }
    );
  }, [fetchProduct]);

  const handleNameQueryChange = (event) => setNameQuery(event.target.value);
  const handleNameSortChange = (event) => setNameSort(event.target.value);
  const handlePriceChange = (event) => setPriceSort(event.target.value);

  // const filteredProducts = [...data]
  //   .filter(product => product.title.includes(nameQuery))
  //   .sort((a, b) => {
  //     if (nameSort === 'asc') return a.title.localeCompare(b.title);
  //     if (nameSort === 'desc') return b.title.localeCompare(a.title);
  //     if (priceFilter === 'low-to-high') return a.price - b.price;
  //     if (priceFilter === 'high-to-low') return b.price - a.price;
  //     return 0;
  //   });

  const nameSortProduct = [...data]
  .filter(product => product.title.includes(nameQuery))
  .sort((a , b) => {
    if(nameSort === 'asc') return a.title.localeCompare(b.title)
    if(nameSort === 'desc') return b.title.localeCompare(a.title)
    return 0;
  })
  
  const priceSortProduct = [...nameSortProduct]
  .sort((a , b) => {
    if(priceSort === 'low-to-high') return a.price - b.price;
    if(priceSort === 'high-to-low') return b.price - a.price;
    return 0;
  })


  return (
    <>
      <ProductNavbar />
      <DivStyle>
        <MenuProduct>
          <p>دسته بندی:</p>
          {data.map((item, index) => (
            <p key={index} style={{ color: "orange", fontSize: "15px", marginBottom: "15px" }}>{item.title}</p>
          ))}
        </MenuProduct>

        <div style={{ flexGrow: 1 }}>
          <ControlsContainer>
            <TextField
              label="جستجوی نام"
              variant="outlined"
              value={nameQuery}
              onChange={handleNameQueryChange}
              sx={{ m: 1, minWidth: 150 }}
            />

            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel>مرتب‌سازی نام</InputLabel>
              <Select value={nameSort} onChange={handleNameSortChange} autoWidth>
                <MenuItem value=""><em>بدون مرتب‌سازی</em></MenuItem>
                <MenuItem value="asc">صعودی</MenuItem>
                <MenuItem value="desc">نزولی</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel>مرتب‌سازی قیمت</InputLabel>
              <Select value={priceSort} onChange={handlePriceChange} autoWidth>
                <MenuItem value=""><em>بدون مرتب‌سازی</em></MenuItem>
                <MenuItem value="low-to-high">ارزان‌ترین</MenuItem>
                <MenuItem value="high-to-low">گران‌ترین</MenuItem>
              </Select>
            </FormControl>
          </ControlsContainer>

          <GridContainer>
            {priceSortProduct.map((product, index) => (
              <ItemContainer key={index}>
                <Image src={product.images[0]} alt={product.title} />
                <p>{product.title}</p>
                <p>{product.price} تومان</p>
              </ItemContainer>
            ))}
          </GridContainer>
        </div>
      </DivStyle>
    </>
  );
};

export default ManagementCategories;
