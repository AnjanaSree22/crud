//importing the function

import express from 'express';
import { getMethod, putMethod, postMethod, deleteMethod, auth} from './user.js';

const app = express();

app.use(express.json());

//function calls
app.get('/items',auth, getMethod);

app.put('/items/:itemId', auth, putMethod);

app.post('/items',auth, postMethod);

app.delete('/items/:itemId',auth, deleteMethod);

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
