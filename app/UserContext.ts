import { createContext } from "react";
import { create } from "zustand";

interface User{
    "Email":String,
    "Name": String,
    "UpiHandle": String
}

let usera : User = {Email:"abcd@gmail.com", Name:"abcd", UpiHandle:"Abcd"}

export const useUserStore = create<User | undefined>(()=>undefined)