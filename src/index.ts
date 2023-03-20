import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts, users } from './database'
import { ACCOUNT_TYPE, TAccount, TUsers } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

app.get("/accounts/:id", (req: Request, res: Response) => {
    const id: string = req.params.id
    const result: TAccount = accounts.find((item) => item.id === id)

    res.status(200).send(result)
})

//GET
//POST
//PUT
//DELETE
// Os q tem params sempre por ultimo

app.put("/accounts/:id", (req: Request, res: Response) => {
    const id: string = req.params.id
    const newOwnerName: string | undefined = req.body.ownerName
    const newBalance: number | undefined = req.body.balance
    const newType: ACCOUNT_TYPE | undefined = req.body.type

    const account: TAccount = accounts.find((item) => item.id === id)

    // Breakpoint && ou || - volta ou um ou outro valor
    // && - se este primeiro valor existe, retorna o segundo valor
    // || - se o primeiro existe, volta o proprio, se nao existir, volta o segundo valor

    console.log("Conta Antes:", account);

    if (account) {
        account.ownerName = newOwnerName || account.ownerName

        account.balance = isNaN(newBalance) ? account.balance : newBalance
        // type of (newBalance) !== "number"
        // pergunta ? sim : não
        account.type = newType || account.type

    }
    console.log("Conta Depois:", account);

    res.status(201).send("Conta Alterada")
})

app.delete("/accounts/:id", (req: Request, res: Response) => {
    const id: string = req.params.id
    const index: number = accounts.findIndex((item) => item.id === id)
    //console.log("index", index) // -1 => quando nao encontra nenhum valor

    let message: string
    if (index >= 0) {
        accounts.splice(index, 1)
        message = "Item deletado com sucesso"
    } else {
        message = "Nenhum item encontrado"
    }

    console.log(accounts);

    //findIndex
    //splice (index, n) - (2 parametros, de onde comeco a remover e quantos quero remover)
    res.status(200).send(message)
})

// POST - para criar - Create
// GET - para ler - Read
// PUT - para atualizar - Update
// Delete - para deletar - Delete
// C R U D

//---------------------------exercicios-------------------------------

app.get("/users", (req: Request, res: Response) => {
    res.send(users)
})

app.get("/users/:id", (req: Request, res: Response) => {
    const id: string = req.params.id
    const result: TUsers = users.find((item) => item.id === id)
    res.status(200).send(result)
})

app.post("/users/", (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string

    const newUser: TUsers = {
        id: id,
        name: name,
        email: email
    }

    users.push(newUser)
    console.log(users);
    res.status(200).send("Usuário Criado!")
})

app.put("/users/:id", (req: Request, res: Response) => {
    const id: string = req.params.id
    const newName: string | undefined = req.body.name
    const newEmail: string | undefined = req.body.email

    const user: TUsers = users.find((item) => item.id === id)

    if (users) {
        user.name = newName || user.name
        user.email = newEmail || user.email
    }

    console.log(users);
    res.status(200).send("Usuário Alterado!")
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const id: string = req.params.id

    const index: number = users.findIndex((item) => item.id === id)

    if (index >= 0) {
        users.splice(index, 1)
    }
    console.log(users);
    res.status(200).send("Usuario Deletado")
})

