import Axios from 'axios'

const httpService = {
    get : Axios.get,
    put : Axios.put,
    delete : Axios.delete,
    post : Axios.post
}
export default httpService;