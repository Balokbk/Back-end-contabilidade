const fixId = require('../helpers/fixId.js')

class Controller{
    constructor(entityService, idKey){
        this.entityService = entityService
        this.idKey = idKey
    }
    async getAll(req, res){
        try{
            const registList = await this.entityService.getAllRegisters()
            return res.status(200).json(registList)
        }catch(error){
            return res.status(500).json({type:error, message:error.message})
        }
    }
    async getById(req, res){
        const { id } = req.params
        const where = Number(id)
        try{
            const record = await this.entityService.getById(where)
            if(!record){
                return res.status(404).json({message:'Resgistro não encontrado'})
            }
            return res.status(200).json(record)
        }catch(error){
            return res.status(500).json({type:error, message:error.message})
        }
    }
    async createNew(req, res){
        const createData = req.body
        try{
            const newRegist = await this.entityService.createRegister(createData)
            return res.status(201).json({ message:'Registro criado com sucesso', reg:newRegist })
        }catch(error){
            return res.status(500).json({type:error, message:error.message})
        }
    }
    async update(req, res){
        const { ...params } = req.params
        const where = fixId(params, idKey)
        const updatedData = req.body
        try{
            const isUpdated = await this.entityService.updateRegist(updatedData, {...where})
            if(!isUpdated){
                return res.status(400).json({message:'O registro não foi atualizado'})
            }
            return res.status(201).json({message:'O registro foi atualizado'})
        }catch(error){
            return res.status(500).json({type:error, message:error.message})
        }
    }
    async delete(req, res){
        const { ...params } = req.params
        const where = fixId(params, this.idKey)
        try{
            await this.entityService.delete({...where})
            res.status(200).json({message:'Registro deletado com suecesso!'})
        }catch(error){
            return res.status(500).json({type:error, message:error.message})
        }
    }
}

module.exports = Controller