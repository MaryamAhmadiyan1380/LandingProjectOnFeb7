import {useMutation} from 'react-query'
import {apiSignUp} from '../Api/apiSignUp'

 const useSignUp = () => {
    return useMutation({
        mutationFn : apiSignUp
    })
}
export default useSignUp;

