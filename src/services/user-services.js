import {publicAxios}  from "./axios-config";
import { baseURL } from "./axios-config";

function registerDoSaveUser(obj)
{
    // return publicAxios.get("http://localhost:8000/users/register-user?email="+em+"&password="+pwd+"&type="+typ);
    return publicAxios.post(`${baseURL}/users/register-user`,obj);

}


function LoginDoLogging(obj)
{
    return publicAxios.post(`${baseURL}/users/login-user`,obj);
}


export {registerDoSaveUser,LoginDoLogging};