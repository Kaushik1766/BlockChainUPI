import { useUserStore } from "@/functions/userContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { Axios } from "axios"

export const checkPassword = async (password: string) =>{
    try{
        let token = await AsyncStorage.getItem('UPI-login-token')
        let response = await axios.post("https://dev-chain-upi.azurewebsites.net/api/auth/checkPassword",
            {
                "password":password,
            },
            {
            headers:{"Authorization":"Bearer "+token}
        })
        console.log("success")
        return true;
    }
    catch (err : any){
        return false;
    }
}

export const changeUserPassword = async (password: string) =>{
    try{
        let token = await AsyncStorage.getItem('UPI-login-token')
        let response = await axios.post("https://dev-chain-upi.azurewebsites.net/api/profile/changePassword",
            {
                "password":password,
            },
            {
            headers:{"Authorization":"Bearer "+token}
        })
        console.log("success")
        return true;
    }
    catch (err : any){
        console.log(err.response.data.error);
        return false;
    }
}

export const login = async (email : string, password: string)=>{
        const response = await axios.post('https://dev-chain-upi.azurewebsites.net/api/auth/login', {
            "email": email,
            "password": password,
        }, {
            headers:{
                "set-cookie":""
            }
        });
        if (response.headers["set-cookie"]){
            let end = response.headers["set-cookie"][0].indexOf(";")
            let tokens = response.headers["set-cookie"][0].substring(6, end).split(".")
            let bodyObject = JSON.parse(atob(tokens[1]))
            useUserStore.setState(bodyObject)
            await AsyncStorage.setItem('UPI-login-token', response.headers["set-cookie"][0].substring(6, end))
        }
        console.log('Login successful:', response.data);
        return response
}

export const signup = async (username : string, email: string, password: string)=>{
    const response = await axios.post('https://dev-chain-upi.azurewebsites.net/api/auth/signup', {
        "username": username,
        "email": email,
        "password": password,
    });
    return response
}

export const validateUser = async ()=>{
    let token = await AsyncStorage.getItem('UPI-login-token')
    if (token){   
        let tokenBody = token.split(".")
        let bodyObject = JSON.parse(atob(tokenBody[1]))

        await axios.get("https://dev-chain-upi.azurewebsites.net/api/auth/check", {
            headers: { "Authorization": "Bearer " + token }
        })

        useUserStore.setState(bodyObject)
    }
    else{
        throw new Error("No token found")
    }
}

export const logout = async () => {
    useUserStore.setState(undefined)
    await AsyncStorage.removeItem('UPI-login-token')
}