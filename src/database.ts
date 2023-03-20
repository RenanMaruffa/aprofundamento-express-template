import { ACCOUNT_TYPE, TAccount, TUsers } from "./types";

export const accounts: TAccount[] = [
    {
        id: "a001",
        ownerName: "Ciclano",
        balance: 10000,
        type: ACCOUNT_TYPE.GOLD
    },
    {
        id: "a002",
        ownerName: "Astrodev",
        balance: 500000,
        type: ACCOUNT_TYPE.BLACK
    },
    {
        id: "a003",
        ownerName: "Fulana",
        balance: 20000,
        type: ACCOUNT_TYPE.PLATINUM
    }
]

export const users: TUsers[] = [
    {
        id: "u01",
        name: "Renan",
        email: "lala@lala.com"
    },
    {
        id: "u02",
        name: "Nathalia",
        email: "lala2@lala.com"
    },
    {
        id: "u03",
        name: "Gabriel",
        email: "lala3@lala.com"
    }
]