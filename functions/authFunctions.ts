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
        console.log(err);
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