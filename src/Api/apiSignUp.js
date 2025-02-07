import http from "./httpService"

const urlSignUp = "https://api.escuelajs.co"



export const apiSignUp = async(signUpData) => {
    try{
        const response = await http.post(`${urlSignUp}/api/v1/users/`,signUpData)
        return response.data
    }
    catch(error){
        console.error('error signup data is:',error)
    }
}
