import express from 'express';
const router = express.Router();

let items = [{id:"", item:""}]; 

const key = {
    username: "abc",
    password: "123",
  };



//Read-operation function
function getMethod(req,res){
    try{
        res.json(items);
        return res.status(200).json({message:"message read successfully"})
    }catch(error){
        console.error("error in getMethod",error);
        return res.status(500).json({message:"Internal server error"});
    }
    
};

//Update-operation function
function putMethod(req, res){
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
function postMethod(req, res) {
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
function deleteMethod(req, res) {
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


//middleware function

function auth(req, res, next) {
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


//exporting the functions
export default router;
export {getMethod,putMethod,postMethod,deleteMethod, auth};




