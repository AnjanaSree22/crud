//importing the function

import express from 'express';
import { getMethod, putMethod, postMethod, deleteMethod, auth, createTable, insertData, findData, deleteData, addData, readData } from './user.js';
import { pool } from './db_connect.js';


const app = express();

app.use(express.json());

//function calls
app.get('/items',auth, getMethod);

app.put('/items/:itemId', auth, putMethod);

app.post('/items',auth, postMethod);

app.delete('/items/:itemId',auth, deleteMethod);

app.get('/createtable',createTable);

app.get('/insertData', insertData);

app.get('/findData/:id',findData);

app.delete('/deleteData/:id',deleteData)

app.post('/addData',addData)

app.get('/readData', readData)



// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
