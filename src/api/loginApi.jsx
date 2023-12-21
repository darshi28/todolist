
import axios from 'axios';
import instance from '../api/basicconfig';

const baseURL = 'http://127.0.0.1:5000/';

const Login = async (data) => {
    try {
        console.log("before api call :", data);
        const response = await instance.post(baseURL + 'access-tokens/', data)

        const jwt = response.data['jwt'];
        const reftoken = response.data['refresh_token'];
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('refresh_token', reftoken);

        if (response) {
            console.log(JSON.stringify(response.data));
            return response.data
        }
    } catch (error) {
        console.error(error.msg);
        reftoken();
    }
}
  async function reftoken(){
  
    console.log("baseurl", baseURL)
    const ref_token = {
        "refresh_token" : localStorage.getItem('refresh_token')
    }
    console.log("token", ref_token);
    const response = await axios.post(baseURL + 'access-tokens/refresh', ref_token)
    const jwt1 = response.data['jwt'];
    console.log("refresh_token", jwt1)
    localStorage.setItem('jwt',jwt1);
    return true;      
} 

export default Login;
export { reftoken };