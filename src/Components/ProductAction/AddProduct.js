import {apiPostProduct} from '../../Api/apiProduct'

export const AddProduct = ({newProduct , setData , setSuccessAdd , setFailAdd , setErrors , addValidate , handleCloseAdd}) => {
    if(addValidate()){
        const productData={
            ...newProduct,
            title : newProduct.title,
            price : parseFloat(newProduct.price),
            description : newProduct.description,
            categoryId : parseFloat(newProduct.categoryId),
            images : [newProduct.images]
        }
        if(!productData.categoryId){
            console.error('آیدی محصول وجود ندارد یا نامعتبر است!لطفا یک آیدی معتبر وارد کنید')
            setErrors((prevError) => ({...prevError, categoryId : 'آیدی اجباری است لطفا آیدی معتبر را وارد کنید'}))
            return;
        }
        console.log('بررسی اطلاعات محصول',productData);
        apiPostProduct(productData)
        .then((addProduct) => {
          console.log('محصول با موفقیت اضافه شد', addProduct);
          setData((prevData) => [...prevData, addProduct]);
          setSuccessAdd(true);
          setTimeout(() => setSuccessAdd(false), 3000);
        })
        .catch((error) => {
          console.error('خطای اضافه شدن محصول:', error);
          setFailAdd(true);
          setTimeout(() => setFailAdd(false), 3000);
        });
  
      handleCloseAdd();
    }
    
}
