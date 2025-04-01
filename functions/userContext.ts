import { createContext } from "react";
import { create } from "zustand";

interface User{
    "Email":String,
    "Name": String,
    "UID":String,
    "UpiHandle": String
}

export const useUserStore = create<User | undefined>(()=>undefined)

