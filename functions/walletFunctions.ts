import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosError } from "axios"
import { useState } from "react"

interface Wallet{
    "address":string,
    "chain":string,
    "balance":number,
    "isPrimary":boolean
}

export {Wallet}

const addWallet = async (address:string, privateKey: string, chain: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
    try{
        let token = await AsyncStorage.getItem('UPI-login-token')
        let response = await axios.post("https://dev-chain-upi.azurewebsites.net/api/wallet/addWallet",
            {
                "address":address,
                "privatekey":privateKey,
                "chain":chain
            },
            {
            headers:{"Authorization":"Bearer "+token}
        })
    }
    catch (err : any){
        console.log(err.response.data.error);
    }
}

export {addWallet}

const fetchWallets = async (setChainWallets: React.Dispatch<React.SetStateAction<Record<string, Wallet[]> | undefined>>) => {
        const possibleChains = ["eth", "trx"]
        try{
            let token = await AsyncStorage.getItem('UPI-login-token')
            let response = await axios.get("https://dev-chain-upi.azurewebsites.net/api/wallet/getWallets",{
                headers:{"Authorization":"Bearer "+token}
            })
            let chain: Record<string, Wallet[]> = {};

            possibleChains.forEach(el => chain[el] = [])
            if (response.data !== null){
                response.data.forEach((el: Wallet)=>{
                    if (!(el.chain in chain)){
                        chain[el.chain] = []
                    }
                    if (el.isPrimary){
                        chain[el.chain].unshift(el)
                    }
                    else{
                        chain[el.chain].push(el)
                    }
                })
            }
            setChainWallets(chain)          
        }
        catch (err){
            console.log(err)
            // useUserStore.setState(undefined)
            // await AsyncStorage.removeItem('UPI-login-token')
            // let res = await AsyncStorage.getItem('UPI-login-token')
            // console.log(res + "logout")
            // router.navigate("/Welcome")
        }
    }

export default fetchWallets