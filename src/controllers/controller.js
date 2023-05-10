const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {validateToDo,validateParams} = require('../validations/index');

const getToDoList = async (request,response) => {
    try {
        const toDoList = await prisma.list.findMany();

        return response.status(201).json(toDoList);
    } catch (error) {
        console.log(error);
    }
}

const getOnelist = async (request,response) => {
    try {
        const { error } = validateParams(request.params);
        if(error){
            return response.status(400).send(error.details[0].message)
        }

        const uniqueId = parseInt(request.params.id);
        const checkId = await prisma.list.findUnique({
            where : {
                id : uniqueId
            }
        });
        if(checkId === null){
            return response.status(400).json({message : "id not found"})
        }

        return response.status(201).json(checkId);
    } catch (error) {
        console.log(error);
    }
}

const createNewTodo = async (request,response) => {
    try {
        const { error } = validateToDo(request.body);
        if(error) {
            return response.status(400).send(error.details[0].message)
        }

        const newText = request.body.text;
        const newIscompleted = request.body.iscompleted;

        const createTodo = await prisma.list.create({
            data: {
                text : newText,
                iscompleted : newIscompleted
            }
        });

        return response.status(200).json(createTodo);
    } catch (error) {
        console.log(error);
    }           
}

const updateATodo = async (request,response) => {
    try {

        const uniqueId = parseInt(request.params.id);

        if(!Number.isInteger(uniqueId)){
            return response.status(404).send("Id should be a integer")
        }
        
        const {error}  = validateToDo(request.body);
        if(error) {
            return response.status(400).send(error.details[0].message)
        }
    
        const checkId = await prisma.list.findUnique({
            where : {
                id : uniqueId
            }
        });
        if(checkId === null){
            return response.status(400).json({message : "id not found"})
        }

        const updateText = request.body.text;
        const updateIscompleted = request.body.iscompleted;

        const updatedData = await prisma.list.update({
            where: {
                id: uniqueId
            },
            data: {
                text: updateText,
                iscompleted: updateIscompleted
            }
        })

        return response.status(201).json(updatedData);
    } catch (error) {
        console.log(error);
    }
}


const deleteOneTodo = async (request,response) => {
    try {
        const { error } = validateParams(request.params);
        if(error){
            return response.status(400).send(error.details[0].message)
        }

        const uniqueId = parseInt(request.params.id);
    
        const checkId = await prisma.list.findUnique({
            where : {
                id : uniqueId
            }
        });
        if(checkId === null){
            return response.status(404).json({message : "id not found"})
        }

        const deleteTodo = await prisma.list.delete({
            where:{
                id : uniqueId
            }
        })

        return response.status(200).json(deleteTodo);
    } catch (error) {
        console.log(error);
    }
}





module.exports = {getToDoList,getOnelist,createNewTodo,deleteOneTodo,updateATodo};