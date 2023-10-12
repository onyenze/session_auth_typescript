import express from "express"

import {deleteUserbyId, getUserById, getUsers} from "../model/user.model"


export const getAllUsers =async (req:express.Request, res:express.Response) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}


export const updateUser = async (req:express.Request,res:express.Response) => {
    try {
        const {id} = req.params
        const {username} = req.body

       const user = await getUserById(id)
       user.username = username
       await user.save()
       return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export const deleteUser = async (req:express.Request, res: express.Response) =>{
    try {
        const {id} = req.params
        const deletedUser = await deleteUserbyId(id)
        res.status(204).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}