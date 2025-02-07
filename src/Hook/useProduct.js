import {useMutation} from 'react-query'
import { apiGetProduct} from '../Api/apiProduct'

const useProduct = () => {
    return useMutation({
        mutationFn : apiGetProduct
    })
} 
export default useProduct