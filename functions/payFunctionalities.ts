import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const payToUpi = async (recieverUpi: string, amount: number, chain: string, senderWallet: string, setCheckUrl: React.Dispatch<React.SetStateAction<string | undefined>>)=>{
    let shortenedUpi = recieverUpi.split("@")[0]
    try{
        let token = await AsyncStorage.getItem('UPI-login-token')
        let response = await axios.post("https://dev-chain-upi.azurewebsites.net/api/transaction/sendToUpi",
            {
                "amount":parseFloat(amount.toString()),
                "receiverUpi":shortenedUpi,
                "chain":chain,
                "wallet":senderWallet
            },
            {
            headers:{"Authorization":"Bearer "+token}
        })
        console.log("success")
        setCheckUrl(response.data.hash)
        return true;
    }
    catch (err : any){
        console.log(err)
        return false;
    }
}

export default payToUpi