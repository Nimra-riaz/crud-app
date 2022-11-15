const { response } = require('express');
const TodoRepo = require('../Repository/todoRepository')
//const TodoRepo = require('../Repository/todoRepository')
//const TodoRepo= require('../Repository/todoRepository')

class TodoController{

    async getAll(req,res) {
        const todoRepo = new TodoRepo();
        //try{
            let result= await todoRepo.getAllTask();
        
        console.log(result.rows)
        res.json({
            todo: result.rows
        });
            
        //}
        //catch(error){
          //  next(error);
       // }
        

    }

    async createTask(req,res){
        const TodoRepo = new TodoRepo();
        let result = await TodoRepo.createtaskRepo(request.body.task,request.body.done);
        
        
        res.json({
            
            "Status": "Task Created"
        });
    }

    
    async FilterTask(req,res){
        const TodoRepo = new TodoRepo();
        let result = await TodoRepo.filtertaskRepo();
        res.json({
            todo: result.rows
        });
    }

    
    async CountTask(req,res){
        const TodoRepo = new TodoRepo();
        let result = await TodoRepo.counttaskRepo();
        res.json({
            todo: result.rows
        });
    }

    
    async UpdateTask(req,res){
        const TodoRepo = new TodoRepo();
        let result = await TodoRepo.updatetaskRepo(request.body.id,request.body.task);

        
        res.json({
            
            "Status": "Task Updated"
        });
    }

    
    async UpdateStatus(req,res){
        const TodoRepo = new TodoRepo();
        let result = await TodoRepo.updatetaskRepo(request.body.id,request.body.done);

        
        res.json({
            
            "Status": "Status Updated"
        });
    }

    
    async DeleteTask(req,res){
        const TodoRepo = new TodoRepo();
        let result = await TodoRepo.updatetaskRepo(request.body.id);

        
        res.json({
            
            "Status": "Task Deleted"
        });
    }
}

module.exports = TodoController;