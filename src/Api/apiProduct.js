import http from '../Api/httpService'

const urlProduct = "https://api.escuelajs.co"

export const apiGetProduct = async () => {
    try {
        const response = await http.get(`${urlProduct}/api/v1/products`)
        return response.data
    }
    catch (error) {
        console.error("Product Error is:", error)
    }
}
export const apiPostProduct = async (addProduct) => {
    try {
        const response = await http.post(`${urlProduct}/api/v1/products/`, addProduct)
        return response.data
    }
    catch (error) {
        console.error('post product error is:', error)
    }
}
export const apiEditProduct = async ( productId) => {
    try {
        const response = await http.put(`${urlProduct}/api/v1/products/${productId}`)
        return response.data;
    }
    catch (error) {
        console.error('update product error is: ', error)
    }

}
export const apiDeleteProduct = async (productId) => {
    try {
        const response = await http.delete(`${urlProduct}/api/v1/products/${productId}`)
        return response.data;
    }
    catch(error){
        console.error('delete product error is: ',error)
    }
    


}
