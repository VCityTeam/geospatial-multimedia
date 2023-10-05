const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');

const app = express();
const PORT = 8001;

app.use(cors({origin:'http://localhost:8000', credentials: true}));

app.use(json());

app.post('/test', (req, res)=>{
    console.log('Bonjour response', req.body);

    // ici on stock l'image dans le SQLITE
    res.send({title:'SCHLAAACK', position:'400'});

})

app.listen(PORT, (err) => {
    if (err) {
      console.error('Server could not start');
      return;
    }
    console.log('geospatial Http server listening on port', PORT);
  });


