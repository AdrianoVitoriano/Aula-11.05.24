import Usuarios from "../models/usuarios.model.js"
import { validationResult } from "express-validator"

export default class UsuariosController{ 
    static async listar(req,res){
        res.json(await Usuarios.findMany())
    }
    static async exibir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const usuario = await buscarPorID(req.params.id)
        if(!usuario.encontrado){
            return res.status(404).json(usuario.message)
        }
        res.json(usuario.usuario)
    }
    static async inserir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        res.json(await Usuarios.create({data:req.body}))
    }
    static async alterar(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const usuario = await buscarPorID(req.params.id)
        if(!usuario.encontrado){
            return res.status(404).json(usuario.message)
        }
        res.json(await Usuarios.update({where:{id: parseInt(req.params.id)},data: req.body}))

    }
    static async excluir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const usuario = await buscarPorID(req.params.id)
        if(!usuario.encontrado){
            return res.status(404).json(usuario.message)
        }
        await Usuarios.delete({where:{id: parseInt(req.params.id)}})
        res.json({message: "Usuário excluído com sucesso."})
    }
}

async function  buscarPorID(id){
    const usuario = await Usuarios.findUnique({where: {id: parseInt(id)}, include:{tarefas: true,produtos:true}})
    if(!usuario){
        return {encontrado: false, message: "Usuarios não encontrado"}
    }
    return {encontrado: true, usuario: usuario}
}