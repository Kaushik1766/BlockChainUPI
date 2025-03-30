import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosError } from "axios"

interface Wallet{
    "address":string,
    "chain":string,
    "balance":number,
    "isPrimary":boolean
}

export {Wallet}

const addWallet = async (privateKey: string, chain: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
    try{
        let token = await AsyncStorage.getItem('UPI-login-token')
        let response = await axios.post("https://dev-chain-upi.azurewebsites.net/api/wallet/addWallet",
            {
                "privatekey":privateKey,
                "chain":chain
            },
            {
            headers:{"Authorization":"Bearer "+token}
        })
        console.log("success")
        setError("")
        return true;
    }
    catch (err : any){
        console.log(err.response.data.error);
        if (err.response.data.error === "Duplicate wallet found."){
            setError("Duplicate Wallet Found")
        }
        else{
            setError("Invalid private key")
        }
        return false;
    }
}

export {addWallet}

const getEthWalletBalance = async (address: string) => {
    try {
        let response = await axios.get("https://api-sepolia.etherscan.io/api",
            {
                params:{
                    chainid: 1,
                    module:"account",
                    action:"balance",
                    address: address,
                    tag:"latest",
                    apikey:""
                }
            }
        )
        if (response.data.result === "Missing/Invalid API Key"){
            return 0
        }
        if (response.data.result){
            let amount = parseFloat((response.data.result * 1e-18).toFixed(4));
            return amount
        }
        return 0
    }
    catch (err){
        console.log(err)
        return 0
    }
}

export {getEthWalletBalance}

const getTrxWalletBalance = async (address: string) => {
    try {
        let response = await axios.post("https://api.shasta.trongrid.io/wallet/getaccount",
            {
                "address": address,
                "visible": true
            }
        )
        if (response.data.balance){
            let amount = parseFloat((response.data.balance * 1e-6).toFixed(4));
            return amount
        }
        return 0
    }
    catch (err){
        console.log(err)
        return 0
    }
}

export {getTrxWalletBalance}


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

const getEthWalletTransactions = async (address: string)=>{
    try {
        let response = await axios.get("https://api-sepolia.etherscan.io/api",
            {
                params:{
                    chainid: 1,
                    module:"account",
                    action:"txlist",
                    address: address,
                    startblock:0,
                    endblock:99999999,
                    sort:"desc",
                    tag:"latest",
                    apikey:"RVYXH2RYAU135XQP3RK9438VB9Q25N6V4E5"
                }
            }
        )
        if (response.data.result === "Missing/Invalid API Key"){
            return []
        }
        if (response.data.result){
            let result = response.data.result.slice(0, 20);
            return result
        }
        return []
    }
    catch (err){
        console.log(err)
        return 0
    }
}

export {getEthWalletTransactions}

const getTrxWalletTransactions = async (address: string)=>{
    try {
        let response = await axios.get(`https://api.shasta.trongrid.io/v1/accounts/${address}/transactions`)
        if (response.data.data){
            let result = response.data.data.slice(0, 20);
            return result
        }
        return []
    }
    catch (err){
        console.log(err)
        return []
    }
}

export {getTrxWalletTransactions}

export default fetchWallets