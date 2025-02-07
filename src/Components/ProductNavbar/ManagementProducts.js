import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Alert,  Checkbox } from '@mui/material'
import useProduct from '../../Hook/useProduct'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { CCollapse, CContainer, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink } from '@coreui/react'
import '../../Styles/ManagementCategories.css'
import ProductNavbar from '../ProductNavbar';
import useGetCategories from '../../Hook/useGetCategories'
import ModalAdd from '../../ModalProduct/ModalAdd'
import ModalDelete from '../../ModalProduct/ModalDelete'
import ModalEdit from '../../ModalProduct/ModalEdit'
import {AddProduct} from '../ProductAction/AddProduct'
import {EditProduct} from '../ProductAction/EditProduct'
import {DeleteProduct} from '../ProductAction/DeleteProduct'

const RTLContainer = styled.div`
  direction: rtl;
  text-align: right;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin: 10px 5px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;
const ItemContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  position: relative;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    height: auto;
    padding: 10px;
  }
`;
const Image = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
  margin-top: 10px;

  @media (max-width: 768px) {
    max-width: 200px;
  }

  @media (max-width: 480px) {
    max-width: 150px;
  }
`;
const DivIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
const ManagementProducts = () => {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', categoryId: '', images: '' })
  const [originalProduct, setOriginalProduct] = useState(null)
  const { mutate: fetchProduct } = useProduct();
  const [visible, setVisible] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [successAdd, setSuccessAdd] = useState(false)
  const [failAdd , setFailAdd] = useState(false)
  const [successEdit, setSuccessEdit] = useState(false)
  const [failEdit , setFailEdit] = useState(false)
  const [successDelete, setSuccessDelete] = useState(false)
  const [failDelete , setFailDelete] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [errors, setErrors] = useState({ title: '', price: '', description: '', categoryId: '', images: '' })
  const { mutate: fetchCategories } = useGetCategories();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [checkedItem, setCheckedItem] = useState({})

  useEffect(() => {
    fetchProduct(
      {},
      {
        onSuccess: (response) => {
          console.log('product response is: ', response);
          setOriginalProduct([...response])
          setData(response);
        },
        onError: (error) => {
          console.error('Error fetching products:', error);
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
  const handleChange = (productId) => (event) => {
    setCheckedItem({
      ...checkedItem,
      [productId]: event.target.checked,
    })
  }

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setNewProduct({ title: '', price: '', description: '', categoryId: '', images: '' });
    setErrors({ title: '', price: '', description: '', categoryId: '', images: '' });
    setOpenAdd(false);
  }
  const handleOpenEdit = (product, index) => {
    setNewProduct({ ...product });
    setOpenEdit(true);
    setEditingIndex(index)
    setProductToEdit(product);
  }
  const handleCloseEdit = () => {
    setNewProduct({ title: '', price: '', description: '', categoryId: '', images: '' })
    setErrors({ title: '', price: '', description: '', categoryId: '', images: '' })
    setOpenEdit(false)
    setProductToEdit(null)
    setCheckedItem({})
  }
  const handleOpenDelete = (product) => {
    if (product) {
      setProductToDelete(product)
      setOpenDelete(true)
    }
    else {
      console.error('محصول انتخاب شده پیدا نشد')
    }}
  const handleCloseDelete = () => {
    setOpenDelete(false)
    setProductToDelete(null)
  }
  const addValidate = () => {
    let valid = true;
    const errors = { title: '', price: '', description: '', categoryId: '', images: '' };
    if (!newProduct.title) {
      errors.title = 'لطفا عنوان را وارد کنید';
      valid = false;
    }
    if (!newProduct.price) {
      errors.price = 'لطفا قیمت را وارد کنید ';
      valid = false;
    }
    else if (isNaN(newProduct.price)) {
      errors.price = 'لطفا قیمت را به عدد وارد کنید'
    }
    if (!newProduct.description) {
      errors.description = 'لطفا توضیحات را وارد کنید ';
      valid = false
    }
    if (!newProduct.categoryId) {
      errors.categoryId = 'لطفا ایدی دسته بندی را وارد کنید';
      valid = false
    }
    else if (isNaN(newProduct.categoryId)) {
      errors.categoryId = 'لطفا آیدی را به عدد وارد کنید'
    }
    if (!newProduct.images) {
      errors.images = 'لطفا آدرس تصویر را وارد کنید';
      valid = false
    }
    setErrors(errors)
    return valid;

  }
  const handleAddProduct = () => {
    AddProduct({newProduct , setData , setSuccessAdd , setFailAdd, setErrors,addValidate , handleCloseAdd})
  }
  const editValidate = () => {
    let valid = true;
    const errors = { title: '', price: '' }
    if (!newProduct.title) {
      errors.title = 'لطفا عنوان را وارد کنید';
      valid = false;
    }
    if (!newProduct.price) {
      errors.price = 'لطفا قیمت را وارد کنید'
      valid = false;
    }
    else if (isNaN(!newProduct.price)) {
      errors.price = 'لطفا قیمت را به عدد وارد کنید';
      valid = false
    }
    setErrors(errors)
    return valid;
  }
  const handleEditProduct = () => {
    EditProduct({newProduct, setData, setSuccessEdit, setFailEdit,setErrors, data, editingIndex, editValidate, handleCloseEdit})
};

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handelResetIndex = (index) => {
    const updatedPrpduct = [...data]
    updatedPrpduct[index] = originalProduct[index]
    setData(updatedPrpduct)
    setNewProduct({ title: '', price: '', description: '', categoryId: '', images: '' })
    setEditingIndex(null)
  }
  const handleDeleteProduct = () => {
    DeleteProduct({setFailDelete , setSuccessDelete , handleCloseDelete , data,setData,productToDelete})
}
  useEffect(() => {
    if (selectedCategory !== '0') {
      const element = document.getElementById(`category-${selectedCategory}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedCategory]);

  const categorizedProducts = data.reduce((acc, item) => {
    const category = categories.find(cat => cat.id === item.category?.id)?.name || "Miscellaneous";
    acc[category] = acc[category] || [];
    acc[category].push(item);
    return acc;
  }, {});

  const handleCategorySelect = (category) => {
    const selectedCat = categories.find(cat => cat.name === category);
    if (selectedCat) {
      setSelectedCategory(selectedCat.id.toString());
    }
  };
  return (
    <>
      <ProductNavbar />
      <RTLContainer>
        <CNavbar expand="lg" colorScheme="dark" style={{backgroundColor:"#E7B8F0"}}>
          <CContainer fluid>
            <CNavbarBrand href="#">Navbar</CNavbarBrand>
            <CNavbarToggler aria-label="Toggle navigation" onClick={() => setVisible(!visible)} />
            <CCollapse className="navbar-collapse" visible={visible}>
              <CNavbarNav className="m-auto" style={{ gap: "15px", flexWrap:"wrap",justifyContent:"center",maxWidth:"100%" }}>
                {Object.entries(categorizedProducts).map(([category, products]) => (
                  <CNavItem key={category}>
                    <CNavLink style={{ color: "#360A3F", cursor: "pointer",fontSize:"14px",whiteSpace:"nowrap" }} onClick={() => handleCategorySelect(category)}>
                      {category} ({products.length})
                    </CNavLink>
                  </CNavItem>
                ))}
              </CNavbarNav>
              <Button style={{ color: "#ff8000" }} className="bg-light" onClick={handleOpenAdd}>
                <AddShoppingCartIcon style={{ color: "red" }} /> افزودن محصول </Button>
            </CCollapse>
          </CContainer>
        </CNavbar>
      </RTLContainer>

      {successEdit && <Alert severity='success'>محصول با موفقیت ویرایش شد</Alert>}
      {failEdit && <Alert severity="error">ویرایش محصول با موفقیت انجام نشد</Alert>}
      {successAdd && <Alert severity='success'>محصول با موفقیت اضافه شد</Alert>}
      {failAdd && <Alert severity="error">اضافه شدن محصول با موفقیت انجام نشد</Alert>}
      {successDelete && <Alert severity="error">محصول با موفقیت حذف شد</Alert>}
      {failDelete && <Alert severity="warning">حذف محصول با موفقیت انجام نشد</Alert>}

      <GridContainer>
        {data.filter(product => selectedCategory === '0' || product.category.id.toString() === selectedCategory).map((product, index) => (
          <ItemContainer key={index}>
            <Image src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'} alt={product.title} />
            <h3> <Checkbox checked={!!checkedItem[product.id]} onChange={handleChange(product.id)} inputProps={{ 'aria-label': 'controlled' }} />{product.title}</h3>
            <span>{product.price} تومان</span>
            <Button style={{ marginTop: "10px", color: "red" }}>
              {categories.find(cat => cat.id === product.category.id)?.name || "Miscellaneous"}
            </Button>
            <DivIcon>
              <DeleteForeverIcon style={{ color: "red" }} onClick={() => handleOpenDelete(product)} />
              <EditIcon style={{ color: "lightblue" }} onClick={() => handleOpenEdit(product, index)} />
              <RotateLeftIcon style={{ color: "#333" }} onClick={() => handelResetIndex(index)} />
            </DivIcon>
          </ItemContainer>
        ))}
      </GridContainer>
      <ModalDelete open={openDelete} handleClose={handleCloseDelete} productToDelete={productToDelete} handleDelete={handleDeleteProduct}  />
   <ModalAdd open={openAdd} handleClose={handleCloseAdd} handleInputChange={handleInputChange} handleAddProduct={handleAddProduct} newProduct={newProduct} errors={errors} /> 
      <ModalEdit  open={openEdit}  handleClose={handleCloseEdit}  handleEdit={handleEditProduct}  product={productToEdit}  handleInputChange={handleInputChange}  errors={errors} />
      <ModalEdit  open={openEdit}  handleClose={handleCloseEdit}  handleEdit={handleEditProduct}  newProduct={newProduct}  handleInputChange={handleInputChange}  errors={errors} />
    </>
  );
};
export default ManagementProducts;