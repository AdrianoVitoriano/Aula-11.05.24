import Categorias from "../models/categorias.model.js"
import { validationResult } from "express-validator"

export default class CategoriasController{
    static async listar(req,res){
        res.json(await Categorias.findMany())
    }
    static async exibir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const categoria = await buscarPorID(req.params.id)
        if(!categoria.encontrado){
            return res.status(404).json(categoria.message)
        }
        res.json(categoria.categoria)
    }
    static async inserir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        res.json(await Categorias.create({data:req.body}))
    }
    static async alterar(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const categoria = await buscarPorID(req.params.id)
        if(!categoria.encontrado){
            return res.status(404).json(categoria.message)
        }
        res.json(await Categorias.update({where:{id: parseInt(req.params.id)},data: req.body}))

    }
    static async excluir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const categoria = await buscarPorID(req.params.id)
        if(!categoria.encontrado){
            return res.status(404).json(categoria.message)
        }
        await Categorias.delete({where:{id: parseInt(req.params.id)}})
        res.json({message: "Usuário excluído com sucesso."})
    }
}

async function  buscarPorID(id){
    const categoria = await Categorias.findUnique({where: {id: parseInt(id)}})
    if(!categoria){
        return {encontrado: false, message: "Categorias não encontrado"}
    }
    return {encontrado: true, categoria: categoria}
}