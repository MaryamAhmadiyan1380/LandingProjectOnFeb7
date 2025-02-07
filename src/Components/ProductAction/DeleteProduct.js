import {apiDeleteProduct} from '../../Api/apiProduct'

export const DeleteProduct = ({setFailDelete , setSuccessDelete , handleCloseDelete , data,setData,productToDelete}) => {
    if (productToDelete && productToDelete.id) {
        console.log('عنوان محصول حذف شده:', productToDelete.title);
        console.log('آیدی محصول حذف شده:', productToDelete.id);
        apiDeleteProduct(productToDelete.id).then(() => {
          setData(data.filter((item) => item !== productToDelete))
          setSuccessDelete(true)
          setTimeout(() => setSuccessDelete(false), 3000)
          handleCloseDelete()
        })
          .catch((error) => {
            console.error('پیام خطای حذف محصول: ', error)
            setFailDelete(true)
            setTimeout(() => setFailDelete(false),3000)})} 
            else {
        console.error('محصول برای حذف با این آیدی پیدا نشد')
      }
}