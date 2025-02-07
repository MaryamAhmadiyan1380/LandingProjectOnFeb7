import http from '../Api/httpService'

const urlLogin = "https://api.escuelajs.co"

export const apiLogin = async(loginData) => {
    try{
        const response = await http.post(`${urlLogin}/api/v1/auth/login`,loginData)
        return response.data
    }
    catch(error){
        console.error('Error login data is:' , error)
    }
}

