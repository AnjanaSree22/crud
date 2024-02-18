import express from 'express';
import { pool } from './db_connect.js';
import {validateData} from "./validator.js"
const router = express.Router();

let items = [{id:"", item:""}]; 

const key = {
    username: "abc",
    password: "123",
  };



//Read-operation function
export const getMethod=(req,res)=>{
    try{
        // return res.json(items);
        return res.status(200).json({items:items,message:"message read successfully"});
    }catch(error){
        console.error("error in getMethod",error);
        return res.status(500).json({message:"Internal server error"});
    }
    
};

//Update-operation function
export const putMethod=(req, res)=>{
   try {    
    const itemId = req.params.itemId;
    const updatedItem = { id: itemId, ...req.body };
    console.log(updatedItem);

    return res.status(200).json({
        message: "Item updated successfully",
        items: updatedItem,
    });
} catch (error){
    console.error("error in putMethod:", error);
    return res.status(500).json({message: "Internal server error"});
}

};

//create-operation function
export const postMethod =(req, res)=> {
    try {
        const newItem = req.body;
        const newId = items.length + 1;
        newItem.id = newId;

        items.push(newItem);
        return res.status(201).json({
            message: "Item created successfully",
            items
        }); 
    } catch(error) {
        console.error("Error in postMethod:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//delete-operate function
export const deleteMethod = (req, res) =>{
    try {
        items.id = "";
        items.item="";
        return res.status(200).json({
            message: "Item deleted successfully",
            items
        }); 

    } catch(error) {
        console.error("Error in deleteMethod:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//middleware functions

export const auth=(req, res, next)=> {
    try{const { username, password } = req.body;

    if (username === key.username && password === key.password) {
        next(); 
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }}
    catch(error){
        console.error("Error in authentication:", error);
        return res.status(500).json({ message: "Internal server error" }); 
    }

}

//table creation
export const createTable=async (req,res)=>{
    try{
        const newTable = "CREATE TABLE DEMO_TABLE(ID INTEGER, NAME VARCHAR(50), AGE INTEGER)";
        let result = await pool.query(newTable);
        if(result){
            res.status(201).json({
                error:false,
                msg:"table created successfully",
                data:result,
                code:201,
            })

        }else{
            res.status(400).json({
                error:true,
                msg:"table not created successfully",
                data:result,
                code:201,
            })
        }
        
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//table insertion
export const insertData = async (req,res)=>{
    try{
        const insertData = "INSERT INTO DEMO_TABLE(ID, NAME, AGE) VALUES(1, 'Anjana', 21),(2, 'nayaki', 21), (3,'Navina', 21)";
        let result = await pool.query(insertData);
        if(result){
            res.status(201).json({
                error:false,
                msg:"data inserted successfully",
                data:result,
                code:200,
                
            })
        }else{
            res.status(400).json({
                error:true,
                msg:"table not updated successfully",
                data:result,
                code:400,
            })
        }

    }catch(error){
        console.error(error);
        return res.status(500).json({message:"internal server error"})

    }
}

//data identification
export const findData = async (req,res)=>{
    try{
        const dataID = req.params.id;
        const findDataquery = `SELECT * FROM DEMO_TABLE WHERE ID=${dataID}`;
        let result = await pool.query(findDataquery);
        if(result){
            res.status(200).json({
                error:false,
                msg:"data found successfully",
                data:result.rows,
                code:200,
            })
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({error:true, code:500, errMsg:e.message})
    }
}

export const deleteData = async (req,res)=>{
    try{
        const dataID = req.params.id;
        const deleteDataquery = `DELETE FROM DEMO_TABLE WHERE ID=${dataID} ;`;
        let result = await pool.query(deleteDataquery);
        if(result){
            res.status(200).json({
                error:false,
                msg:"data deleted successfully",
                data:result.rows,
                code:200,
            })
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({error:true, code:500, errMsg:e.message})
    }
}

export const addData = async (req, res)=>{
    try{
        const {data, success, code, message}=validateData(req.body);
        if (!success){
            return res.status(code).json({error:true, errorMsg: message, code});
        }
    }catch (e){
        res.status(500).json({error:true, code:500, errMsg:e.message})
    }
    
}
export const readData = async (req , res)=>{
try{
    const ids = [req.params.id];
    const readQuery = "SELECT * FROM DEMO_TABLE WHERE ID=$1";
    const result = await pool.query(readQuery, ids);
    if(result){
        res.status(200).json({
            error:false,
            msg:"data read successfully",
            data:result.rows,
            code:200,
        })
    }
}catch(error){
    console.error(error);
    return res.status(500).json({error:true, code:500, errMsg:e.message})
}
}
    




//data deletion


//exporting the functions
export default router;
// export {getMethod,putMethod,postMethod, auth};



