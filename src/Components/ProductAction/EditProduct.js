import {apiEditProduct} from '../../Api/apiProduct'

export const EditProduct = ({ newProduct, setData, setSuccessEdit, setFailEdit, data,setErrors, editingIndex, editValidate, handleCloseEdit}) => {
    if (editValidate()) {
        if (editingIndex !== null && newProduct) {
            if(isNaN(newProduct.price || newProduct.price <= 0)){
                console.error('قیمت نامعتبر است!لطفا قیمت عددی معتبر وارد کنید')
                setErrors((prevErrors) => ({...prevErrors,price : 'قیمت باید عددی معتبر و بزرگتر از صفر باشد'}))
            }
            const updatedProduct = { ...newProduct };
            const prevProduct = data[editingIndex];
            apiEditProduct(updatedProduct.id, updatedProduct).then(() => {
                const updatedData = [...data];
                updatedData[editingIndex] = updatedProduct;
                setData(updatedData);
                setSuccessEdit(true);
                setTimeout(() => setSuccessEdit(false), 3000);
                console.log('تغییرات اعمال شده توسط کاربر:');
                if (prevProduct.title !== updatedProduct.title) {
                    console.log(`عنوان تغییر کرد از "${prevProduct.title}" به "${updatedProduct.title}"`);
                }
                if (prevProduct.price !== updatedProduct.price) {
                    console.log(`قیمت تغییر کرد از "${prevProduct.price}" به "${updatedProduct.price}"`);
                }

            })
                .catch((error) => {
                    console.error('ارور ویرایش محصول:', error);
                    setFailEdit(true);
                    setTimeout(() => setFailEdit(false), 3000);
                });
            handleCloseEdit();
        }
    }
}