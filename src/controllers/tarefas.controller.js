import Tarefas from "../models/tarefas.model.js"
import { validationResult } from "express-validator"

export default class TarefasController{
    static async listar(req,res){
        res.json(await Tarefas.findMany())
    }
    static async exibir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const tarefa = await buscarPorID(req.params.id)
        if(!tarefa.encontrado){
            return res.status(404).json(tarefa.message)
        }
        res.json(tarefa.tarefa)
    }
    static async inserir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        res.json(await Tarefas.create({data:req.body}))
    }
    static async alterar(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const tarefa = await buscarPorID(req.params.id)
        if(!tarefa.encontrado){
            return res.status(404).json(tarefa.message)
        }
        res.json(await Tarefas.update({where:{id: parseInt(req.params.id)},data: req.body}))

    }
    static async excluir(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const tarefa = await buscarPorID(req.params.id)
        if(!tarefa.encontrado){
            return res.status(404).json(tarefa.message)
        }
        await Tarefas.delete({where:{id: parseInt(req.params.id)}})
        res.json({message: "Usuário excluído com sucesso."})
    }
}

async function  buscarPorID(id){
    const tarefa = await Tarefas.findUnique({where: {id: parseInt(id)}})
    if(!tarefa){
        return {encontrado: false, message: "Tarefas não encontrado"}
    }
    return {encontrado: true, tarefa: tarefa}
}