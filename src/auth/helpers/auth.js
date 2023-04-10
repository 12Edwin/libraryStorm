import axios from 'axios'

export const auth = async (form) =>{
    try{
        const url = 'http://44.214.206.7:3000/api/auth/login/';
        const response = await axios.post(url,form);
        return response;
    }catch{
        return 'CREDENCIALES INVÁLIDAS';
    }
} 