import express, { NextFunction } from "express"

import {get, merge} from "lodash"

import { getUserBySessionToken } from "../model/user.model"



export const isOwner = async (req:express.Request, res:express.Response, next:NextFunction)=>{
    try {
        const {id} = req.params
        const currentUserId = get(req, "identity._id") as string
        if (!currentUserId){
            return res.sendStatus(403)
        }
        
        
        if (currentUserId.toString() !== id){
            return res.sendStatus(403)
        }
        next()
    } catch (error) {
       console.log(error) 
       return res.sendStatus(500)
    }
}




export const isAuthenticated = async (req: express.Request,res: express.Response, next:NextFunction) =>{
    try {
        const sessionToken = req.cookies["CHIBUEZE_AUTH"]

        if (!sessionToken){
           return res.sendStatus(403)
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        merge(req,{identity:existingUser})
        return next()

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}