import {Request, Response, Router } from 'express'
import { Autos } from '../model/autos'
import { db } from '../database/database'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getAutos = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje: any) => {
            console.log(mensaje)
            const query  = await Autos.find({})
            res.json(query)
        })
        .catch((mensaje: any) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }
    private getPlaca = async (req: Request, res: Response) => {
        const {matricula} =req.params
        console.log(req.params)
        //res.send('Me has dado la matrícula: ${matricula}')
        await db.conectarBD()
        
        .then( async (mensaje: any) => {
            console.log(mensaje)
            
            const query  = await Autos.find({"_matricula": matricula})
            res.json(query)
        })
        .catch((mensaje: any) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }

    misRutas(){
        this._router.get('/autos', this.getAutos)
        this._router.get('/autos/:matricula', this.getPlaca)
 
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router
