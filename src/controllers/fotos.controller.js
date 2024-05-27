import Fotos from "../models/fotos.model.js"
import { Result, param, validationResult } from "express-validator"

export default class FotosController{
    static async listar(req,res){
        res.json(await Fotos.findMany())
    }
    static async exibir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const foto = await buscarPorID(req.params.id)
        if(!foto.encontrado){
            return res.status(404).json(foto.message)
        }
        res.json(foto.foto)
    }
    static async inserir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        res.json(await Fotos.create({data:req.body}))
    }
    static async alterar(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const foto = await buscarPorID(req.params.id)
        if(!foto.encontrado){
            return res.status(404).json(foto.message)
        }
        res.json(await Fotos.update({where:{id: parseInt(req.params.id)},data: req.body}))

    }
    static async excluir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const foto = await buscarPorID(req.params.id)
        if(!foto.encontrado){
            return res.status(404).json(foto.message)
        }
        await Fotos.delete({where:{id: parseInt(req.params.id)}})
        res.json({message: "Usuário excluído com sucesso."})
    }
}

async function  buscarPorID(id){
    const foto = await Fotos.findUnique({where: {id: parseInt(id)}})
    if(!foto){
        return {encontrado: false, message: "Fotos não encontrado"}
    }
    return {encontrado: true, foto: foto}
}